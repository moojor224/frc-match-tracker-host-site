import { useNumberInput } from "@/app/app_structure/analytics_page/useNumberInput.js";
import { ApiContext, TBAAPI } from "@/lib/tba_api/index.js";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { InputPipelineStep } from "../../PipelineRenderer.js";

const NumberPipelineStep: InputPipelineStep<
    number,
    {
        defaultValue?: number;
        min?: number;
        max?: number | ((api: TBAAPI) => number);
    }
> = function ({ name, setValue, min, max, defaultValue }) {
    const [init, setInit] = useState(true);
    const api = useContext(ApiContext);
    const value = useNumberInput({
        min,
        max: typeof max === "function" ? max(api) : max,
        defaultValue
    });
    useEffect(() => {
        if (init) {
            setInit(false);
            if (defaultValue !== undefined) {
                value.onChange({
                    currentTarget: {
                        value: defaultValue
                    }
                });
            }
        }
        if (value.has && !value.hasError) {
            setValue(value.value!);
        }
    }, [value.value]);
    return (
        <TextField
            defaultValue={defaultValue}
            label={name}
            error={value.hasError}
            helperText={value.errorMessage || " "}
            type="number"
            onChange={value.onChange}
            size="small"
            margin="none"
        />
    );
};

export default NumberPipelineStep;
