export default {
    index ( ctx : any ) {
        const user = {name: "admin", email: "isvalid@email.com" };
        ctx.response.body = user;
    },
    show ( ctx : any ) {
        ctx.response.body = ctx.params.id;
    },

}