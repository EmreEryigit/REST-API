import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import { startMetricsServer } from "./utils/metrics";
import createServer from "./utils/server";
import swaggerDocs from "./utils/swagger";

const port = config.get<number>("port");
const app = createServer();
app.listen(port, async () => {
    logger.info(`App running at http://localhost:${port}`);
    await connect();
    startMetricsServer();
    swaggerDocs(app, port);
});
