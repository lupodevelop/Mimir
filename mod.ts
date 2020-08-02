import { log, Application } from "./deps.ts";
import router from "./routes/routes.ts";
import notFound from "./404.ts";

// INIT APP
const app = new Application();

const HOST = "localhost";
const PORT = "8000";

// INIT LOGGER
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

app.use(router.routes());
app.use(notFound);

log.info(`>>>   Mimir is alive @ ${HOST} : ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
