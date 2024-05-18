import { Router } from "express"; 
import CommentController from "../controller/commentController"

let commentController = new CommentController()
const router = Router()

router.post("/createComment",commentController.Createcomment),

router.put("/updateComment/:id",commentController.Updatecomment),

router.get("/getAllComments",commentController.GetAllcomments),
router.get("/getCommentById/:id",commentController.GetcommentById),

router.delete("/Deletecomment/:id",commentController.Deletecomment)


export default router;