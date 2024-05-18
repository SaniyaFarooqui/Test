import post from "../models/post";
import user from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import  { Request, Response } from 'express'

class UserController {
    constructor(){
    }
    public CreateUser =async (req:Request,res:Response)=>{
        let userdata = req.body 
        if(userdata.name == null || userdata.name== undefined || userdata.email == null || userdata == undefined){
            res.status(400).json({error:"data not found"})
        }else{
            try {
                let salt = await bcrypt.genSalt(10);
                let hashpassword = await bcrypt.hash(userdata.password, salt);
                userdata.password = hashpassword;
                let response = await user.create(userdata);
                if (response == null || response == undefined) {
                    res.status(400).json({ error: "operation couldn't complete due to error" });
                } else {
                    res.status(200).json({ message: "user created successfully ", data: response });
                }
            } catch (error:any) {
                res.status(400).json({error:error.message });
            }
        }

    }
    public LoginController = async (req:Request, res:Response) => {
        let { email, password } = req.body;
        if ( email == undefined ||  (email == null && password == null) || password == undefined ) {
          res.status(400).json({ error: "Email | password Required" });
        } else {
          try {
            let isEmailExist:any = await user.findOne({
              where: {
                email: email,
              },
            });
            console.log(isEmailExist);
            if (isEmailExist == null) {
              res.status(400).json({
                error: "User with this email not registered please Sign up",
              });
            } else {
              if (await bcrypt.compare(password, isEmailExist.password)) {
                let token = jwt.sign(
                  { id: isEmailExist.id , userName: isEmailExist.name },
                  process.env.jwt_secret as string,
                  { expiresIn: "30min" }
                );
                let refreshToken = jwt.sign(
                  { id: isEmailExist.id },
                  process.env.jwt_secret as string,
                  { expiresIn: "356d" }
                );
                res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  secure: true,
                });
                res.cookie("accessToken", token, { httpOnly: true, secure: true });
                res.status(200).json({ user: isEmailExist });
              } else {
                res.status(200).json({ error: "Invalid Password" });
              }
            }
          } catch (error) {
            res.status(400).json({ error: error });
          }
        }
    };
    public RefreshToken = async (req:Request, res:Response) => {
        let refreshToken = req.params.token;
        if (refreshToken == null || refreshToken == undefined) {
          res.status(400).json({ error: "refresh token required" });
        } else {
          try {
            let decode :any = jwt.verify(refreshToken, process.env.jwt_secret as string);
            console.log(decode.id);
            if (decode == null || decode == undefined) {
              res.status(400).json({ error: "invalid token" });
            } else {
              let userData : any = await user.findByPk(decode.id);
              if (userData == null || userData == undefined) {
                res.status(400).json({ error: "invalid refresh token" });
              } else {
                let token = jwt.sign(
                  { id: userData.id, userName: userData.name },
                  process.env.jwt_secret as string,
                  { expiresIn: "30min" }
                );
                res.cookie("accessToken", token, { httpOnly: true, secure: true });
                res.status(200).json({ accesToken: token});
              }
            }
          } catch (error :any) {
            res.status(400).json({ error: error.message });
          }
        }
    };
      
    public UpdateUser =async (req:Request,res:Response)=>{
        let id = req.params.id 
        let userdata = req.body
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let userResponse = await user.update(userdata,{where:{id:id}} )
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"cannot update please try again"})
                }else{
                    res.status(200).json({message:"updated succefully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetAllUser = async(req:Request,res:Response) =>{
        let page = req.query.page as unknown as number
        let limit = req.query.limit as unknown as number
        if(page == null || page == undefined || limit == null || limit == undefined){
            page = 1;
            limit = 10;
        }else{
            try {
                let offset = (1-page)
                let userResponse = await user.findAndCountAll({offset:offset,limit:limit,
                    include:post,
                })
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({data:userResponse})
                }else{
                    res.status(200).json({data:userResponse})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }
    public GetUserById = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let userData = await user.findOne({where:{id:Number(id)}})
            if(userData == null|| userData == undefined){
                res.status(400).json({error:"not found"})
            }else{
                res.status(200).json({data:userData})
            }
            } catch (error:any) {
                res.status(400).json({error:error.message})   
            }
            
        }
    }
    public DeleteUser = async(req:Request,res:Response)=>{
        let id = req.params.id
        if(id == null || id == undefined ){
            res.status(400).json({error:"id not found"})
        }else{
            try {
                let userData = await user.destroy({where:{id:Number(id)}})
                if(userData == null|| userData == undefined){
                    res.status(400).json({error:"not found"})
                }else{
                    res.status(200).json({message:"deleted successfully"})
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    };
    public LogoutController = (req:Request, res:Response) => {
        try {
          res.cookie("accessToken", "", { maxAge: 1 });
          res.cookie("refreshToken", "", { maxAge: 1 });
          res.status(200).json({ error: "Logout Successfully" });
          res.end();
        } catch (error:any) {
          res.status(400).json({ error: error.message });
        }
    };
    getTimeStamp = () => {
        return Math.floor(Date.now()/1000)
    }

}
export default UserController