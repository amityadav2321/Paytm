import express from "express"
import { prisma } from "@repo/db"
 const app = express();

 app.post("/hdfcWebhook",async(req,res)=>{
       const paymentInformation={
        token : req.body.token,
        userId :req.body.user_identifier,
        amount :req.body.amount
       };
try {
    await prisma.$transaction([
        prisma.balance.update({
        where:{
            userId:paymentInformation.userId
        },
        data:{
            amount:{
                increment: paymentInformation.amount
            }
        }
    }),
    prisma.onRampTransaction.update({
        where:{
            token: paymentInformation.token,
        },
        data:{
            status: "Success"
        }
    })
    ]);
        res.json({
            message: "Captured"
        })
} catch (e) {
    console.error(e);
    res.status(411).json({
        message:"Error while processing webhook"
    })
}
   
    
 })


 app.listen(3003);