import db from "../config/databases.ts";
import { ObjectId } from "../deps.ts";

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
        //TODO: Better control over the data entered may be needed
        if ( ctx.request.hasBody ) {
        const { value } = await ctx.request.body();

        const insertID = await user.insertOne( value );
        
        /* HTTP 201 Created
        success status response code indicates that the 
        request has succeeded and has led to the creation 
        of a resource.
        The common use case of this status code is as the 
        result of a POST request.
        */
        ctx.response.status = 201;
        ctx.response.body = value;
        } else {
            /* HTTP 400 Bad Request
            response status code indicates that the server 
            cannot or will not process the request due to 
            something that is perceived to be a client error
            */
            ctx.response.status = 400;  
            ctx.response.body = { error: "Please insert some data" };
        }
    },
    update ( ctx : any ){
        
    },
    destroy ( ctx : any ){

    },
}