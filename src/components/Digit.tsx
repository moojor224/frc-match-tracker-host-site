const digits = [0b1110111, 0b0010001, 0b0111110, 0b0111011, 0b1011001, 0b1101011, 0b1101111, 0b0110001, 0b1111111, 0b1111011];

function get(num: number, place: number, color: string) {
    const digit = digits[num % 10];
    const bit = (digit & (1 << (6 - place))) >> (6 - place);
    if (bit == 1) return color;
    return "#000000ff";
}

export default function Digit({ color, num }: { color: string; num: number }) {
    if (isNaN(num)) {
        return (
            <div
                style={{
                    width: "20px",
                    height: "67px",
                    display: "inline-block"
                }}
            ></div>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="-1 -1 12 20">
            <g
                style={{
                    fillRule: "evenodd",
                    stroke: "white",
                    strokeWidth: "0",
                    strokeOpacity: "1",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter"
                }}
            >
                <polygon id="f" points="1,9 0,8 0,2 1,1 2,2 2,8" fill={get(num, 0, color)} />
                <polygon id="a" points="1,1 2,0 8,0 9,1 8,2 2,2" fill={get(num, 1, color)} />
                <polygon id="b" points="9,1 10,2 10,8 9,9 8,8 8,2" fill={get(num, 2, color)} />
                <polygon id="g" points="1,9 2,8 8,8 9,9 8,10 2,10" fill={get(num, 3, color)} />
                <polygon id="e" points="1,17 0,16 0,10 1,9 2,10 2,16" fill={get(num, 4, color)} />
                <polygon id="d" points="9,17 8,18 2,18 1,17 2,16 8,16" fill={get(num, 5, color)} />
                <polygon id="c" points="9,9 10,10 10,16 9,17 8,16 8,10" fill={get(num, 6, color)} />
            </g>
        </svg>
    );
}
