import React from "react";
import { TBAAPI } from "../../lib/tba_api/index.js";
import { createPage } from "./createPage.js";
import { Pipeline } from "./pipeline/index.js";
import { PipelineRenderer } from "./pipeline/PipelineRenderer.js";

/**
 * simple createAnalyticsPage wrapper to make the inputs section pipeline-generated
 */
export function createPagePipeline<Props extends any, T = any>(
    pipeline: Pipeline<T>,
    BodyComponent: React.FunctionComponent<
        Props & {
            api: TBAAPI;
            data: T;
        }
    >
) {
    return createPage<T, Props>(function ({ setData }) {
        return <PipelineRenderer setOutput={setData} pipeline={pipeline} />;
    }, BodyComponent);
}
