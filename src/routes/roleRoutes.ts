import { Router } from "express"; 
import RoleController from "../controller/roleController";

let roleController = new RoleController()
const router = Router()

router.post("/Createrole",roleController.CreateRole),

router.put("/Updaterole/:id",roleController.UpdateRole),

router.get("/GetAllrole",roleController.GetAllRole),
router.get("/GetroleById/:id",roleController.GetRoleById),

router.delete("/Deleterole/:id",roleController.DeleteRole)


export default router;