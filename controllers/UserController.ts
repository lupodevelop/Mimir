import db from "../config/databases.ts";
import { ObjectId } from "../deps.ts"

const user = db.collection("users");


export default {
    async index ( ctx : any ) {
        const data = await user.find();
        ctx.response.body = data;
    },
    async show ( ctx : any ) {
        try{
            /*
            NOTE: Why to use ObjectId 
            It's necessary to cast with ObjectId to verify that the ID 
            is in the correct format, otherwise it will throw an error.

            REFERENCE:
            @Ikkino
            https://github.com/manyuanrong/deno_mongo/issues/89
            */
            const id = ObjectId(ctx.params.id);

            const data = await user.findOne(
            {_id: {$oid: ctx.params.id}},
            );
             ctx.response.body = data;
        } catch (e) {
            ctx.response.status = 404;
            ctx.response.body = {error: "This isn't the user you're looking for"};

        }
    },
    async store ( ctx  : any) {

        const { value } = await ctx.request.body();

        ctx.response.status = 201;
        ctx.response.body = value;
    },
    update ( ctx : any ){
        
    },
    destroy ( ctx : any ){

    },
}