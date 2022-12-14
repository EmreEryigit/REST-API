import express from "express";
import client from "prom-client";
import log from "./logger";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"]
})
export const databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "database response time in seconds",
    labelNames: ["operation", "success"]
})
export function startMetricsServer() {
    app.get("/metrics", async (req, res) => {
        const collectDefaultMetrics =  client.collectDefaultMetrics
        collectDefaultMetrics()
        res.setHeader("Content-Type", client.register.contentType)
        res.send(await client.register.metrics());
    });

    app.listen(9100, () => {
        log.info("metrics server started at 9100");
    });
}
