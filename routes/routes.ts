import { Router } from "../deps.ts";
import UserController from "../controllers/UserController.ts";

const router = new Router();


router.get("/user", UserController.index)
    
.get("/user/:id", UserController.show)

.post("/user", UserController.store);

export default router;