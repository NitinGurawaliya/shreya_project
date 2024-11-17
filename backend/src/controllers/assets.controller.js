import express from "express"
import { PrismaClient } from "@prisma/client"
import { assetSchema } from "../zod/index.js"

const prisma = new PrismaClient()

export async function createAsset(req,res) {

    const body = req.body;
    const userId = req.userId

    const {success} = assetSchema.safeParse(body)

    if(!success){
        return res.status(400).json({msg:"Invalid data sent "})
    }

    try {
        
    const asset = await prisma.asset.create({
        data:{
            userId:parseInt(userId),
            name:body.name,
            value:body.value,
            acquisitionDate: new Date(body.acquisitionDate),
            description:body.description,
            category:body.category
        }
    })


    return res.status(200).json({asset})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"Internal server err"})
    }
    
}

export async function myAssets(req,res) {
    const id = req.userId
    try {
        const myAssets = await prisma.asset.findMany({
            where:{
                id:id
            }
        })

        return res.status(200).json({myAssets})
    } catch (error) {
        console.log(error)
        return res.status(501).json({msg:"Internal server err"})

    }
    
}

export async function deleteAsset(req,res) {
    const id = parseInt(req.params.id)

    try {
        const deleteAsset = await prisma.asset.delete({
            where:{
                id:id
            }
        })

        return res.status(200).json({msg:"Asset deleted sucessfuly"})
    } catch (error) {
        console.log(error)
        return res.status(501).json({msg:"Internal server error "})
    }
}