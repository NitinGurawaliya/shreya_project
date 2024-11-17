import zod from "zod"

export const SignupSchema = zod.object({
  name:zod.string(),
  email:zod.string().email(),
  password:zod.string().min(6)
})


export const signinSchema = zod.object({
  email:zod.string().email(),
  password:zod.string().min(6)
})


export const assetSchema = zod.object({
  name:zod.string(),
  value:zod.number(),
  acquisitionDate:zod.string().date(),
  description:zod.string(),
  category:zod.string()
})