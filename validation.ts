export default {
    async validate(ctx: any) {
      let errors = [];
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
        ctx.response.body = { error: "Please provide the required data" };
        return;
      }
  
      const fields = ["email", "password", "name"];
      for (let i = 0; i < fields.length; i++) {
        if (!value[fields[i]]) {
               /* HTTP 422 Unprocessable Entity 
              response status code indicates that the server 
               understands the content type of the request entity, 
              and the syntax of the request entity is correct, 
              but it was unable to process the contained instructions.
              */
          status = 422; 
          errors.push({ [fields[i]]: `${fields[i]} field is required` });
        }
      }
  
      if (status) {
        ctx.response.body = { errors };
        return false;
      }
  
      return value;
    },
    async validateUpdate(ctx: any) {
      const { value } = await ctx.request.body();
      if (!value || Object.keys(value).length === 0) {
        // HTTP 400 Bad Request
        ctx.response.status = 400; 
        ctx.response.body = {
          errors: { message: "Please provide the required data" },
        };
        return false;
      }
  
      return value;
    },
    async validateLogin(ctx: any) {
      let errors = [];
      let status;
      const { value } = await ctx.request.body();
      if (!value) {
        // HTTP 400 Bad Request
        ctx.response.status = 400; 
        ctx.response.body = {
          errors: { message: "Please provide the required data" },
        };
        return;
      }
  
      const fields = ["email", "password"];
      for (let index = 0; index < fields.length; index++) {
        if (!value[fields[index]]) {
        // HTTP 422 Unprocessable Entity
          status = 422; 
          errors.push({ [fields[index]]: `${fields[index]} field is required` });
        }
      }
  
      if (status) {
        ctx.response.status = status;
        ctx.response.body = { errors };
        return false;
      }
      return value;
    },
  };