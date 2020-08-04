import { 
  log, 
  Application, 
  config,
  init,
  MongoClient,
 } from "./deps.ts";
 
import router from "./routes/routes.ts";
import notFound from "./404.ts";


// INIT APP
const app = new Application();

//INIT DB
await init();
const client  = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("test");
const users = db.collection("users");

// SERVER SETTINGS
const env = config();
const HOST =  env.APP_HOST || "localhost";
const PORT = +env.APP_PORT || "8000";

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
