import express from 'express'
import dotenv from 'dotenv'
import database from './src/config/database'
import cors from 'cors'
import bodyParser from 'body-parser'
import setAssociations from "./src/models/association"
import PostRouter from "./src/routes/postRoutes"
import Rolerouter from "./src/routes/roleRoutes"
import Commentrouter from "./src/routes/commentRoutes"
import userRouter from "./src/routes/userRoutes"

database.sync({alter:true}).then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})
setAssociations()

dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser())

app.use("/api/post",PostRouter)
app.use("/api/user",userRouter)
app.use("/api/comment",Commentrouter)
app.use("/api/role",Rolerouter)


app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})

