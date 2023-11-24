import {NextFunction, Request,Response} from 'express';
import mssql, { VarChar } from 'mssql'
import {v4} from 'uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { registrationSchema } from '../middleware/validators';
import { dbConnectService } from '../services/dbConnectionService';
import { dbConfig } from '../config/dbConfig';


export const registerNewUser=async(req:Request,res:Response)=>{
    try {
        let id =v4()
        let {fullName,email,password,cohortNumber}=req.body
        const{error}=registrationSchema.validate(req.body);
        
        if(error){
            return res.status(406).json({error:error.details[0].message})
        }
        password=await bcrypt.hash(password,10);
    
        const pool = await mssql.connect(dbConfig);
        (await pool.connect()).request()
        .input('id' ,VarChar,id)
        .input('fullName',VarChar,fullName)
        .input('password',VarChar,password)
        .input('cohortNumber',VarChar,cohortNumber)
        .execute('createNewUser')
        
     
        return res.status(201).json({message:`User <${email}> has been registered successfully. Your ID is ${id}`})

        
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({messsage:error.message})

    }

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      
      const pool = await mssql.connect(dbConfig);
      let result=(await pool.connect()).request()
     .input('id',VarChar,id)
     .execute('deleteUser')

      return res.status(201).json({ message: "deleted successfully", result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
};


export const getOneUser =async (req:Request,res:Response)=>{
    try {
          let {id}=req.params
          const pool = await mssql.connect(dbConfig);
          let user=(await pool.connect()).request()
          .input('id',VarChar,id)
          .execute('getOneUser')
  
          return res.status(201).json(user);

    } catch (error:any) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const pool = await mssql.connect(dbConfig);
      let { id } = req.params;
      console.log("params id", id);
      const existingUser = await getUserByIdHelper(id);
      console.log(existingUser);
      if (!existingUser) {
        return res.status(404).json({ message: "No user found with the id" });
      }
  
      let { email,fullName,cohortNumber, } = req.body;
     
      console.log("hey i am an update controller");
      let result = await pool.request()
      .input('id',VarChar,id)
      .input('fullName',VarChar,fullName)
      .input('email',VarChar,email)
      .input('cohortNumber',VarChar,cohortNumber)
      .execute('updateUser')
      console.log(result);
  
      return res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error in updating the user" });
    }
  };
  
  const getUserByIdHelper = async (id: string): Promise<any>=> {
    try {
        const pool = await mssql.connect(dbConfig);
        const user=  (await (pool.request().input('id', VarChar, id).execute("getOneUser"))).recordset[0];
      
        return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  