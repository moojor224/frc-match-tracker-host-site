import { Event, Match_alliance } from "@/lib/tba_api/types.js";
import { Box } from "@mui/material";
import { useContext } from "react";
import "./ControlPanel.css";
import { createPagePipeline } from "./app_structure/createPagePipeline.js";
import { createPipeline, Input, Pipeline, SelectInput } from "./app_structure/pipeline/index.js";
import { PersistPrefixKeyContext } from "./page.js";

type PipelineType<T> = T extends Pipeline<infer U> ? U : never;

function hasTeam(alliance: Match_alliance, team: string | number) {
    return (
        alliance.team_keys.concat(alliance.surrogate_team_keys).includes("frc" + team) &&
        !alliance.dq_team_keys.includes("frc" + team)
    );
}

const eventPipeline = createPipeline()
    .getInputs(
        [
            {
                type: "number",
                name: "Team Number",
                min: 0
            },
            {
                type: "number",
                name: "Year",
                min: 1992,
                max: (api) => api.status!.max_season
            }
        ] satisfies Input[],
        "Get Team Events"
    )
    .then(([team, year]) => ({ team, year }))
    .api(
        (api, data) =>
            [
                api.getTeamEventsByYear("frc" + data.team, data.year + "").then((e) => ({
                    events: e,
                    data
                }))
            ] as const
    )
    .then(([data]) => {
        const events = data.events;
        console.log(events);
        if (!events) return events;
        return events.length === 0 ? null : { events, data: data.data };
    })
    .messageIfNone("No events found for given team and year", "info")
    .getInputs(
        (events) =>
            [
                {
                    type: "select",
                    data: events.events,
                    key: "key",
                    name: "Event",
                    label: "name"
                } satisfies SelectInput<Event>,
                {
                    type: "raw",
                    data: events
                }
            ] as const,
        "Select Event",
        true
    )
    .then(([eventId, { data, events }]) => ({
        data,
        event: events.find((e) => e.key === eventId)!
    }))
    .api((api, { data, event }) => [{ data, event }, api.getEventMatches(event.key)] as const)
    .then(([data, matches]) => {
        if (matches === null || matches.length === 0) return null;
        return [data, matches!];
    })
    .messageIfNone("No matches found for selected event", "info")
    .then(([{ data }, matches]) => {
        const teamMatches = matches.filter((m) => hasTeam(m.alliances.red, data.team) || hasTeam(m.alliances.blue, data.team));
        if (teamMatches.length == 0) return null;
        return { team: data.team, teamMatches };
    })
    .messageIfNone("Team does not have any matches", "error");

const Panel = createPagePipeline<PassBLE, PipelineType<typeof eventPipeline>>(eventPipeline, function ({ api, data }) {
    return <div></div>;
});

const deviceConfigPipeline = createPipeline().getInputs(
    [
        {
            type: "select",
            data: [
                {
                    order: "top",
                    name: "Top Down"
                },
                {
                    order: "bottom",
                    name: "Bottom Up"
                }
            ],
            key: "order",
            name: "Row Ordering",
            defaultValue: "top",
            label: "name"
        } satisfies SelectInput<{ order: string; name: string }>
    ] as const,
    "Save"
);
const DeviceConfig = createPagePipeline<PassBLE, PipelineType<typeof deviceConfigPipeline>>(
    deviceConfigPipeline,
    function ({ api, data, device, tx, rx }) {
        const prefix = useContext(PersistPrefixKeyContext);
        return (
            <div>
                <PersistPrefixKeyContext value={prefix + "-event-selector"}>
                    <Panel device={device} rx={rx} tx={tx} />
                </PersistPrefixKeyContext>
            </div>
        );
    }
);

type PassBLE = {
    device: BluetoothDevice | null;
    /** channel to transmit messages to device */
    tx?: BluetoothRemoteGATTCharacteristic;
    /** channel to recieve messages from device */
    rx?: BluetoothRemoteGATTCharacteristic;
};

export default function ControlPanel({
    allGood,
    device,
    tx,
    rx
}: {
    allGood: boolean;
    // assume device and tx/rx are non-null due to all interactions being disabled if either is null
    device: BluetoothDevice | null;
    /** channel to transmit messages to device */
    tx?: BluetoothRemoteGATTCharacteristic;
    /** channel to recieve messages from device */
    rx?: BluetoothRemoteGATTCharacteristic;
}) {
    return (
        <Box className={allGood ? "" : "all-disabled"} tabIndex={allGood ? 0 : -1}>
            <Box sx={{ overflowX: "auto" }}>
                {/* <RowPreview /> */}
                <PersistPrefixKeyContext value={"device-config"}>
                    <DeviceConfig device={device} rx={rx} tx={tx} />
                </PersistPrefixKeyContext>
            </Box>
        </Box>
    );
}
