import { Box } from "@mui/material";
import "./BooleanLight.css";

export default function BooleanLight({ text, state }: { text: string; state: "bad" | "inter" | "good" }) {
    return (
        <Box
            padding="3px"
            sx={{
                "--color": state == "bad" ? "red" : state == "inter" ? "orange" : "lime",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "100%"
            }}
        >
            <div className="boolean-display-dot"></div>
            <div className="boolean-display-text">{text}</div>
        </Box>
    );
}
