import { bcrypt } from "../deps.ts";

export default {
    async bcrypt(stringToHash: string): Promise<string> {
      const hash = await bcrypt.hash(stringToHash);
      return hash;
    },
    async verify(hash: string, text: string): Promise<boolean> {
      const result = await bcrypt.compare(text, hash);
      return result;
    },
  };

  /* 
    NOTE: 
    Integrating a SALT to make the encryption stronger might be an idea
    bcrypt:
           https://deno.land/x/bcrypt@v0.2.4
  */