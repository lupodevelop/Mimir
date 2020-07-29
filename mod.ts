import { Application } from "./deps.ts";

// INIT APP
const app = new Application();

const HOST = "localhost";
const PORT = "8000";

app.use(async ctx =>{
    ctx.response.body = 'The server is online';
});

console.log(`>>>   Mimir is alive @ ${HOST} : ${PORT}`);
await app.listen(`${HOST}:${PORT}`);