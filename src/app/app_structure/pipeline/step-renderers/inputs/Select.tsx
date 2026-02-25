import { useInput } from "@/app/app_structure/analytics_page/useInput.js";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { InputPipelineStep } from "../../PipelineRenderer.js";
import { SelectInput } from "../../index.js";

function string(val: string | null | undefined) {
    if (typeof val === "string") {
        return val;
    }
    return "";
}

const SelectPipelineStep: InputPipelineStep<string, { input: SelectInput<any>; defaultValue?: string }> = function ({
    input,
    name,
    setValue,
    defaultValue
}) {
    const value = useInput<string>(defaultValue);
    const [init, setInit] = useState(true);
    useEffect(() => {
        if (init) {
            setInit(false);
            if (defaultValue !== undefined) {
                value.set(defaultValue);
            }
        }
        if (value.has && !value.hasError) {
            // console.debug("setting select value", value.value);
            setValue(value.value!);
        }
    }, [value.value]);
    if (!value.has) {
        value.set(input.data[0]?.[input.key]);
    }
    return (
        <FormControl error={value.hasError}>
            <InputLabel>{name}</InputLabel>
            <Select
                defaultValue={defaultValue}
                label={name}
                value={value.value}
                onChange={(evt) => value.set(string(evt.target.value))}
                size="small"
                margin="none"
                autoWidth
                sx={{ minWidth: "200px" }}
            >
                {input.data.map((d, idx) => {
                    const val = d[input.key] + "";
                    const label = (() => {
                        if (input.label === undefined) {
                            return val;
                        }
                        return d[input.label];
                    })();
                    return (
                        <MenuItem key={val} value={val}>
                            {label}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{value.errorMessage || " "}</FormHelperText>
        </FormControl>
    );
};

export default SelectPipelineStep;
