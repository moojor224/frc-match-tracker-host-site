import Number from "./Number.js";

export default function SegmentPreview({ color, numDigits }: { numDigits: number; color: string }) {
    return (
        <Number
            color={color}
            num={parseInt(
                new Array(numDigits)
                    .fill(0)
                    .map((e, i) => (i + 1) % 10)
                    .join("")
            )}
        />
    );
}
