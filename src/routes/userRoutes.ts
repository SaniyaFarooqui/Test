import { Router } from "express"; 
import UserController from "../controller/userController";

let userController = new UserController()
const router = Router()

router.post("/CreateUser",userController.CreateUser),
router.post("/LoginController",userController.LoginController)
router.post("/RefreshToken/:token",userController.RefreshToken)

router.put("/UpdateUser/:id",userController.UpdateUser),

router.get("/GetAllUser",userController.GetAllUser),
router.get("/GetUserById/:id",userController.GetUserById),

router.delete("/DeleteUser/:id",userController.DeleteUser)
router.delete("/LogoutController",userController.LogoutController)


export default router;