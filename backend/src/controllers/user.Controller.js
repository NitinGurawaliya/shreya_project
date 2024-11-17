import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client"
import {SignupSchema,signinSchema} from "../zod/index.js"

const prisma  = new PrismaClient()

export async function signup(req, res) {

    const body = req.body;
  
    try {
      const {success} = SignupSchema.safeParse(body)
  
    if(!success){
      return res.status(401).json({msg:"Invalid data sent"})
    }
  
    const findUnique = await prisma.user.findUnique({
      where: {
          email: body.email
      }
    });
  
  if (findUnique) {
      return res.status(400).json({
          msg: "Account already exists"
      });
  }
  
  
  
    const user  = await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:body.password
      }   
    })
  
    const token = jwt.sign(user.id,process.env.JWT_SECRET)
  
    return res.status(200).json({ token});
    } catch (error) {
      console.log(error)
      return res.status(400).json({msg:"Internal server error "})
    }
}

export const signin = async (req ,res) => {
    const body = req.body;

    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({
            msg: "Invalid inputs"
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(400).json({
                msg: "No valid user"
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.status(200).json({
            token
        });
    } catch (error) {
        console.error('Error signing in:', error);
        return res.status(401).json({
            msg: "Internal server error"
        });
    }
};
    
