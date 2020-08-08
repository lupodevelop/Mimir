export default {
    async validate ( ctx : any ) {

        //TODO: Better control over the data entered may be needed

        if ( !ctx.request.hasBody ) {
            /* HTTP 400 Bad Request
            response status code indicates that the server 
            cannot or will not process the request due to 
            something that is perceived to be a client error
            */
           ctx.response.status = 400;  
           ctx.response.body = { error: "Please insert some data" };
           return;

        }
        const { value } = await ctx.request.body();
        if ( !value.email ){
            /* HTTP 422 Unprocessable Entity 
            response status code indicates that the server 
            understands the content type of the request entity, 
            and the syntax of the request entity is correct, 
            but it was unable to process the contained instructions.
            */
            ctx.response.status = 422;
            ctx.response.body = { 
                error: { 
                    message: "Email is required" 
                }
            };
            return;
        }
         return value;
    }
}