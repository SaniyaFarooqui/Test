import comment from "../models/comment";
import  { Request, Response } from 'express'

class commentController {
    constructor(){
    }
    public Createcomment =async (req:Request,res:Response)=>{
        let commentdata = req.body
        if(commentdata == null || commentdata == undefined ){
            res.status(400).json({error:"data not found"})
        }else{
            try {
                let commentResponse = await comment.create(commentdata)
                if(commentResponse == null || commentResponse == undefined){
                    res.status(400).json({error:"cannot create please try again"})
                }else{
                    res.status(200).json({message:"created succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public Updatecomment =async (req:Request,res:Response)=>{
        let id = req.params.id 
        let commentdata = req.body
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let commentResponse = await comment.update(commentdata,{where:{id:Number(id)}})
                if(commentResponse == null || commentResponse == undefined){
                    res.status(400).json({error:"cannot update please try again"})
                }else{
                    res.status(200).json({message:"updated succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetAllcomments = async(req:Request,res:Response) =>{
        let page = req.query.page as unknown as number
        let limit = req.query.limit as unknown as number
        if(page == null || page == undefined || limit == null || limit == undefined){
            page = 1;
            limit = 10;
        }else{
            try {
                let commentResponse = await comment.findAndCountAll({
                    offset:page,
                    limit:limit
                })
                if(commentResponse == null || commentResponse == undefined){
                    res.status(400).json({data:commentResponse})
                }else{
                    res.status(200).json({data:commentResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetcommentById = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let commentData = await comment.findOne({where:{id:Number(id)}})
            if(commentData == null|| commentData == undefined){
                res.status(400).json({error:"not found"})
            }else{
                res.status(200).json({data:commentData})
            }
            } catch (error:any) {
                res.status(400).json({error:error.message})   
            }
            
        }
    }
    public Deletecomment = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let commentData = await comment.destroy({where:{id:Number(id)}})
                if(commentData == null|| commentData == undefined){
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
export default commentController