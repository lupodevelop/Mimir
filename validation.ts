export default {
  async validate(ctx: any) {

    let errors : any = [];
    let status;
    const { value } = await ctx.request.body();

    //TODO: Better control over the data entered may be needed

    if (!value) {
      /* HTTP 400 Bad Request
            response status code indicates that the server 
            cannot or will not process the request due to 
            something that is perceived to be a client error
            */
       ctx.response.status = 400;
       ctx.response.body = { error: "Please insert some data" };
       return;
    }
    
    const fields = ['email',];


    for (let i = 0; i < fields.length; i++) {
      
      if (!value[fields[i]]) {
        /* HTTP 422 Unprocessable Entity 
              response status code indicates that the server 
              understands the content type of the request entity, 
              and the syntax of the request entity is correct, 
              but it was unable to process the contained instructions.
              */
        status = 422;

        errors.push({
          [fields[i]]: `${fields[i].toUpperCase()} is required`
        });
        return false;
      }
      
    }

    if (status) {
    ctx.response.body = {errors};
    }

    return value;
  },
};
