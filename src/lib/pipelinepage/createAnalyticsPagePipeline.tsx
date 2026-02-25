import React from "react";
import { TBAAPI } from "../../lib/tba_api/index.js";
import { createAnalyticsPage } from "./createAnalyticsPage.js";
import { Pipeline } from "./pipeline/index.js";
import { PipelineRenderer } from "./pipeline/PipelineRenderer.js";

/**
 * simple createAnalyticsPage wrapper to make the inputs section pipeline-generated
 */
export function createAnalyticsPagePipeline<T>(
    pipeline: Pipeline<T>,
    BodyComponent: React.FunctionComponent<{
        api: TBAAPI;
        data: T;
    }>
) {
    return createAnalyticsPage(function ({ setData }) {
        return <PipelineRenderer setOutput={setData} pipeline={pipeline} />;
    }, BodyComponent);
}
