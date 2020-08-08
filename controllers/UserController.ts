import db from "../config/databases.ts";
import { ObjectId } from "../deps.ts";
import validation from "../validation.ts";

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

      const data = await user.findOne(
        { _id: { $oid: ctx.params.id } },
      );
      ctx.response.body = data;
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "This isn't the user you're looking for" };
    }
  },
  async store(ctx: any) {
    //NOTE: validation logic MOVED outside.
    const value = await validation.validate(ctx);

    if (value) {
      const insertID = await user.insertOne(value);
      /* HTTP 201 Created
        success status response code indicates that the 
        request has succeeded and has led to the creation 
        of a resource.
        The common use case of this status code is as the 
        result of a POST request.
        */
      ctx.response.status = 201;
      ctx.response.body = insertID;
    }
  },
  async update(ctx: any) {
    //TODO: Implement data checking before the update.

    const { value } = await ctx.request.body();
    await user.updateOne(
      { _id: { $oid: ctx.params.id } },
      { $set: value },
    );
    ctx.response.status = 200;
    ctx.response.body = { mesasge: "Data updated" };
  },

  async destroy(ctx: any) {
    try {
      // I use the solution I used before to check the id
      const id = ObjectId(ctx.params.id);
      await user.deleteOne({ _id: { $oid: ctx.params.id } });
      ctx.response.status = 204;
      ctx.response.body = { message: "Successfully Deleted" };
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "The id does not exist" };
    }
  },
};
