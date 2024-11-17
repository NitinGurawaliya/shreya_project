import express from "express"
import { createAsset,myAssets ,deleteAsset} from "../controllers/assets.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import userRouter from "./user.Router.js";

const assetsRouter = express.Router();

assetsRouter.post("/asset",authMiddleware,createAsset)
assetsRouter.get("/assets/bulk",authMiddleware,myAssets)
userRouter.delete("/asset/:id",authMiddleware,deleteAsset)



export default assetsRouter;