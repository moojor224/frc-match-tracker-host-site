import Digit from "./Digit.js";

export default function Number({ color, num }: { num: number; color: string }) {
    return (
        <>
            {num
                .toFixed(0)
                .toString()
                .split("")
                .map((e, idx) => (
                    <Digit key={idx} color={color} num={parseInt(e)} />
                ))}
        </>
    );
}
