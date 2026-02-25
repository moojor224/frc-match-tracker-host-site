import { ApiContext, TBAAPI } from "@/lib/tba_api/index.js";
import { Container, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";

type PickerComponent<T> = React.FunctionComponent<{
    api: TBAAPI;
    setData: (data: T) => void;
}>;
type BodyComponent<T, Props> = React.FunctionComponent<
    Props & {
        api: TBAAPI;
        data: T;
    }
>;

function B({ ico, oc }: { oc: React.MouseEventHandler; ico: React.ReactNode }) {
    return (
        <Button onClick={oc} variant="outlined">
            {ico}
        </Button>
    );
}

export function createPage<T, Props = {}>(PickerComponent: PickerComponent<T>, BodyComponent: BodyComponent<T, Props>) {
    return function Body(props: Props) {
        const api = useContext(ApiContext);
        const [data, setData] = useState<T | null>(null);
        return (
            <Stack sx={{ height: "100%" }}>
                <Box className="hide-scrollbar" sx={{ position: "relative", overflowY: "auto" }}>
                    <Container maxWidth="xl" sx={{ padding: 3 }}>
                        <Stack spacing={2}>
                            <Paper elevation={4} sx={{ padding: 3 }}>
                                <PickerComponent {...{ api, setData }} />
                            </Paper>
                            {data === null ? (
                                <></>
                            ) : (
                                <Paper elevation={4} sx={{ padding: 3, wordWrap: "break-word" }}>
                                    <BodyComponent {...props} {...{ api, data }} />
                                </Paper>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </Stack>
        );
    };
}
