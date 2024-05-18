import role from "../models/role";
import { Request, Response } from 'express'
import user from "../models/user";
import permission from "../models/permission";

class RoleController {
    constructor(){
    }
    public CreateRole =async (req:Request,res:Response)=>{
        let roledata = req.body as any
        if(roledata == null || roledata == undefined ){
            res.status(400).json({error:"data not found"})
        }else{
            try {
                let roleResponse = await role.create(roledata)
                if(roleResponse == null || roleResponse == undefined){
                    res.status(400).json({error:"cannot create please try again"})
                }else{
                    res.status(200).json({message:"created succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public UpdateRole =async (req:Request,res:Response)=>{
        let id = req.params.id 
        let roledata = req.body
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let roleResponse = await role.update(id as any,roledata)
                if(roleResponse == null || roleResponse == undefined){
                    res.status(400).json({error:"cannot update please try again"})
                }else{
                    res.status(200).json({message:"updated succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetAllRole = async(req:Request,res:Response) =>{
        let page = req.query.page as unknown as number
        let limit = req.query.limit as unknown as number
        if(page == null || page == undefined || limit == null || limit == undefined){
            page = 1;
            limit = 10;
        }else{
            try {
                let roleResponse = await role.findAndCountAll({offset:page,limit:limit,
                    include:user
                })
                if(roleResponse == null || roleResponse == undefined){
                    res.status(400).json({data:roleResponse})
                }else{
                    res.status(200).json({data:roleResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetRoleById = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let roleData = await role.findOne({where:{id:Number(id)}})
            if(roleData == null|| roleData == undefined){
                res.status(400).json({error:"not found"})
            }else{
                res.status(200).json({data:roleData})
            }
            } catch (error:any) {
                res.status(400).json({error:error.message})   
            }
            
        }
    }
    public DeleteRole = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let roleData = await role.destroy({where:{id:Number(id)}})
                if(roleData == null|| roleData == undefined){
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
export default RoleController