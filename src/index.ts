import express, { Request, Response, json } from 'express';
// import { dbConnectService } from './services/dbConnectionServices';

import cors from 'cors';
import { dbConnectService } from './services/dbConnectionService';
import userRouter from './routes/userRoutes';




const app=express();
app.use(json())
app.use(cors())
const port =3400

app.use((req:Request,res:Response)=>{
    res.send({"hello":"greetings"})

})

app.use("/users",userRouter)



app.listen(port,()=>{
    console.log("I am runnning on this port ------------",port)
})