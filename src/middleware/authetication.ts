import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

const isAutheticated = async(req:Request,res:Response,next:NextFunction)=>{
    let authHeader = req.headers.authorization

    if(authHeader == null || authHeader == undefined){
        res.status(400).json({error:"Please Login"});
    }else{
        let [header,token] = authHeader.split(" ")
        if(!(header && token)){
            res.status(401).json({error:"Unauthorized Access Please Login"});
        }else{
            try {
                let user:string|JwtPayload = jwt.verify(token, process.env.jwt_secret as string)
                if(user == null){
                    res.status(400).json({error:"Invalid Credentials"});
                }else{
                    req.user =user
                    next()
                }        
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }    
        }
    }


}
export default isAutheticated;