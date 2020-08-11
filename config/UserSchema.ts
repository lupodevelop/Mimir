// Defining user schema interface
// TODO: 
// Implement the use of the schema throughout the code base.
export interface UserSchema {
  _id: { $oid: string };
  username: string;
  email: string;
  password: string;
  //NOTE: it's a test.
  required: ["username", "email", "password"];
}
