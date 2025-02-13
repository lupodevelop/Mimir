import db from "../config/databases.ts";
import { ObjectId } from "../deps.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";


const user = db.collection("users");


export default {
    async index(ctx: any) {
      const data = await user.find();
      ctx.response.body = data;
    },
    async show(ctx: any) {
      try {
        /*
            NOTE: Why to use ObjectId 
            It's necessary to cast with ObjectId to verify that the ID 
            is in the correct format, otherwise it will throw an error.

            REFERENCE:
            @Ikkino
            https://github.com/manyuanrong/deno_mongo/issues/89
            */

        const id = ObjectId(ctx.params.id);
        const data = await user.findOne({ _id: ObjectId(ctx.params.id) });
        ctx.response.body = data;
      } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: "This isn't the user you're looking for." };
      }
    },
    async store(ctx: any) {
      //NOTE: validation logic MOVED outside. 
      const value = await validation.validate(ctx);
      if (value) {
        value.created_at = parseInt((new Date().getTime() / 1000).toString());
        value.password = await hash.bcrypt(value.password);
        const insertId = await user.insertOne(value);
        /* HTTP 201 Created
        success status response code indicates that the 
        request has succeeded and has led to the creation 
        of a resource.
        The common use case of this status code is as the 
        result of a POST request.
        */
        ctx.response.status = 201;
        ctx.response.body = insertId;
      }
    },
    async update(ctx: any) {

      //TODO: Implement data checking before the update.

      const value = await validation.validateUpdate(ctx);
      if (value) {
        const data = {
          email: value.email,
          name: value.name,
          password: value.password,
        };
        try {
          await user.updateOne({ _id: ObjectId(ctx.params.id) }, { $set: data });
          ctx.response.status = 200;
          ctx.response.body = { message: "updated" };
        } catch (e) {
          ctx.response.status = 404;
          ctx.response.body = { error: "User does't exists in our database." };
        }
      }
    },
    async destroy(ctx: any) {
      try {
        await user.deleteOne({ _id: ObjectId(ctx.params.id) });
        // no content
        ctx.response.status = 204; 
      } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: "User does't exists in our database." };
      }
    },
  };