// STANDARD LIBRARY DEPENDENCIES
export * as log from "https://deno.land/std@0.61.0/log/mod.ts";


// THIRD PARTY DEPENDENCIES 

// A middleware framework for Deno's http server, including a router middleware.
export {
    Application,
    Router,
  } from "https://deno.land/x/oak@v6.0.1/mod.ts";

//Dotenv handling for deno.
export { config } from "https://deno.land/x/dotenv@v0.5.0/mod.ts";

//MongoDB Driver
export { 
  init,
  MongoClient,
} from "https://deno.land/x/mongo@v0.9.2/mod.ts";