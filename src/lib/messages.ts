export function parseMessage(raw: string) {
    const split = raw.split(":");
    const command = split[0];
    const args = split.slice(1);
    switch (command) {
        case "setNumRows":
            return parseRows(args);
    }
}

function parseRows(data: string[]) {
    const rows = parseInt(data[0]);
    return {
        type: "row-count",
        data: rows
    };
}
