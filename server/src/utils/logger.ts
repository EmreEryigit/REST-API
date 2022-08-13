import logger from "pino";
import dayjs from "dayjs";

const inTest = process.env.NODE_ENV === "test";

const log = logger({
  enabled: !inTest,
  transport: !inTest ? {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  } : undefined,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
