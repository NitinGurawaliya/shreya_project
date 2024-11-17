import express from "express"
import userRouter from "./router/user.Router.js";
import dotenv from "dotenv"
import assetsRouter from "./router/asset.Router.js";

const app = express();
dotenv.config()
app.use(express.json())


app.use("/api/v1",userRouter)
app.use("/api/v1",assetsRouter)

app.listen(5000,()=>{
    console.log("server is runnning ")
})