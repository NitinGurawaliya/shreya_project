import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(400).json({msg:"Not authenticated user "})
    }

    try {
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.userId= user.id;
        next()
        console.log(req.userId)
     } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Internal server error "})
    }
}