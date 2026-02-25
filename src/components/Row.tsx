import Digit from "./Digit.js";

const lengths = [3, 5, 5, 5, 3, 5, 5, 5, 3];
const colors = ["white", "red", "red", "red", "white", "blue", "blue", "blue", "white"];
const gaps = new Array(8).fill(0).map((e) => <Digit color="white" num={NaN} />);

function interleaveArrays<T extends any[]>(arr1: T, arr2: T): T {
    const interleaved = [] as unknown as T;
    const maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length) {
            interleaved.push(arr1[i]);
        }
        if (i < arr2.length) {
            interleaved.push(arr2[i]);
        }
    }

    return interleaved;
}

export default function Row({ data }: { data: string }) {
    const columns = data.split(":").map((e, i) => (
        <>
            {e
                .padStart(lengths[i], "0")
                .split("")
                .map((n, idx) => (
                    <Digit key={idx} color={colors[i]} num={parseInt(n)} />
                ))}
        </>
    ));
    const spaced = interleaveArrays(columns, gaps).map((e, i) => {
        e.props.key = i;
        return e;
    });
    return <>{spaced}</>;
}
