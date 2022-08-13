import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
function connect() {
    const dbUri = config.get<string>("dbUri");
    return mongoose
        .connect(dbUri)
        .then(() => {
            logger.info("connected to mongodb");
        })
        .catch((error) => {
            logger.error("Could not connect to mongodb");
            process.exit(1);
        });
}
export default connect;
