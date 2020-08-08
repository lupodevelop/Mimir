import { Router } from "../deps.ts";
import UserController from "../controllers/UserController.ts";

const router = new Router();

router.get("/user", UserController.index)
  .get("/user/:id", UserController.show)
  .post("/user", UserController.store)
  .patch("/user:id", UserController.update)
  .delete("/user:id", UserController.destroy);

export default router;
