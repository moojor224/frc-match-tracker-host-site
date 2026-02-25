import { useInput } from "./useInput.js";

type NumberInput = {
    readonly has: boolean;
    readonly value: number | undefined;
    onChange(event: { currentTarget: { value: any } }): void;
    readonly errorMessage: string;
    readonly hasError: boolean;
    setError(message: string): void;
};

export function useNumberInput(
    { min = -Infinity, max = Infinity, defaultValue }: { min?: number; max?: number; defaultValue?: number } = {
        min: -Infinity,
        max: Infinity
    }
) {
    const input = useInput<number>(defaultValue);
    const retVal = {
        has: input.has,
        value: input.value,
        onChange(event) {
            retVal.setError("");
            const value = parseInt(String(event.currentTarget.value));
            if (Number.isNaN(value)) {
                input.set(undefined);
            } else {
                input.set(value);
                if (value < min) {
                    retVal.setError("Number must be at least " + min);
                } else if (value > max) {
                    retVal.setError("Number must be at most " + max);
                }
            }
        },
        hasError: input.hasError,
        errorMessage: input.errorMessage,
        setError: input.setError
    } satisfies NumberInput;
    return retVal;
}
