import db from "../config/databases.ts";
import { ObjectId } from "../deps.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";
//import token from "../util/token.ts";

//testing the schema
interface UserSchema {
    _id: { $oid: string };
    email:string;
    username: string;
    password: string;
  }

const userCollection = db.collection<UserSchema>("users");


export default {
  async login(ctx: any) {
    // validation
    const value = await validation.validateLogin(ctx);
    if (!value) {
      return;
    }

    // fetch user
    const user = await userCollection.findOne({ email: value.email });
    console.log(user);
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = {
        errors: { message: "Credentials doesn't match out record" },
      };
      return ;
    }    

    //verify password
    const passwordMatched = await hash.verify(user.password, value.password);
    if (!passwordMatched) {
      ctx.response.body = { error: "Password is incorrect" };
      return;
    }

  },
}