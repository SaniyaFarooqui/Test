import comment from "../models/comment";
import post from "../models/post";
import { Request, Response } from 'express'

class postController {
    constructor(){
    }
    public CreatePost =async (req:Request,res:Response)=>{
        let postdata = req.body
        if(postdata == null || postdata == undefined ){
            res.status(400).json({error:"data not found"})
        }else{
            try {
                let postResponse = await post.create(postdata)
                if(postResponse == null || postResponse == undefined){
                    res.status(400).json({error:"cannot create please try again"})
                }else{
                    res.status(200).json({message:"created succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public UpdatePost =async (req:Request,res:Response)=>{
        let id = req.params.id 
        let postdata = req.body
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let postResponse = await post.update(id as any,postdata)
                if(postResponse == null || postResponse == undefined){
                    res.status(400).json({error:"cannot update please try again"})
                }else{
                    res.status(200).json({message:"updated succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetAllPosts = async(req:Request,res:Response) =>{
        let page = req.query.page as unknown as number
        let limit = req.query.limit as unknown as number
        if(page == null || page == undefined || limit == null || limit == undefined){
            page = 1;
            limit = 10;
        }else{
            try {
                let postResponse = await post.findAndCountAll({offset:page,limit:limit,
                    include:comment
                })
                if(postResponse == null || postResponse == undefined){
                    res.status(400).json({data:postResponse})
                }else{
                    res.status(200).json({data:postResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetPostById = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let postData = await post.findOne({where:{id:Number(id)}})
            if(postData == null|| postData == undefined){
                res.status(400).json({error:"not found"})
            }else{
                res.status(200).json({data:postData})
            }
            } catch (error:any) {
                res.status(400).json({error:error.message})   
            }
            
        }
    }
    public DeletePost = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let postData = await post.destroy({where:{id:Number(id)}})
                if(postData == null|| postData == undefined){
                    res.status(400).json({error:"not found"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }

}
export default postController