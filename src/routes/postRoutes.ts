import { Router } from "express"; 
import PostController from "../controller/postController";

let postController = new PostController()
const router = Router()

router.post("/CreatePost",postController.CreatePost),

router.put("/UpdatePost/:id",postController.UpdatePost),

router.get("/GetAllPosts",postController.GetAllPosts),
router.get("/GetPostById/:id",postController.GetPostById),

router.delete("/DeletePost/:id",postController.DeletePost)


export default router;