import { Router } from "../deps.ts";


const router = new Router();

router.get("/user", (ctx:any) => {
    const user = {name: "admin", email: "isvalid@email.com" };
    ctx.response.body = user;
});

router.get("/user/:id", (ctx) => {
    ctx.response.body = ctx.params.id;
});

router.post("/user", async (ctx:any) => {

    const { value } = await ctx.request.body();

    ctx.response.status = 201;
    ctx.response.body = value;
});

export default router;