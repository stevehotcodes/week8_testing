import mssql from 'mssql'
import { dbConfig } from '../config/dbConfig'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { registerNewUser,getOneUser } from '../controllers/userControllers'
import { Request, Response,NextFunction } from 'express'
import { any } from 'joi'

describe ("user registration",()=>{
   

    it("successfully registers a user", async ()=>{
        const  req={
             body:{
                fullName:"Tester",
                email:"tester@yopmail.com",
                password:"HashedPassword@123",
                cohortNumber:1

             }

             
        }
        
       
        const  res={
            status:jest.fn().mockReturnThis(),
            json:jest.fn()

        }

       jest.spyOn(bcrypt,'hash').mockResolvedValueOnce("HashPassword@123" as never);
       
       const mockedInput=jest.fn().mockReturnThis() 

       const mockedExecute=jest.fn().mockResolvedValue({rowsAffected:[1]});

       const mockedRequest={
            input:mockedInput,
            execute:mockedExecute
       }
       
       const mockedPool={
            request:jest.fn().mockReturnValue(mockedRequest)

        }
    
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockedPool as never)


      
      


        await registerNewUser(req as Request ,res as any)


        expect(res.json).toHaveBeenCalledWith({message:"User is registered successfully."});
        expect(res.status).toHaveBeenCalledWith(201)
        expect(mockedInput).toHaveBeenCalledWith('password',mssql.VarChar,'HashPassword@123')
        expect(mockedInput).toHaveBeenCalledWith('fullName',mssql.VarChar,'Tester')
        expect(mockedInput).toHaveBeenCalledWith('email',mssql.VarChar,'tester@yopmail.com')




    })
})

// id VARCHAR(255) PRIMARY KEY NOT NULL ,
//     fullName VARCHAR(255) NOT NULL,
//     cohortNumber INT DEFAULT 0 NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(MAX) NOT NULL,
//     dateJoined DATE DEFAULT GETDATE() NOT NULL,
//     role VARCHAR (255) DEFAULT 'user' NOT NULL,
//     isDeleted INT DEFAULT 0 NOT NULL

describe("gets a user",()=>{

    it("successfully get one user",async ()=>{
        const  req={
            params:{
               id: '12hxbsshcdce-yjeyce'
                
            }
       }

       let user={
        id:"2e402706-075f-4dea-80cf-1ecfa3842ae5",,
         fullName:"user",
        cohortNumber :
        //     email VARCHAR(255) UNIQUE NOT NULL,
        //     password VARCHAR(MAX) NOT NULL,
        //     dateJoined DATE DEFAULT GETDATE() NOT NULL,
        //     role VARCHAR (255) DEFAULT 'user' NOT NULL,
        //     isDeleted INT DEFAULT 0 NOT NULL
        
        
    }
       const  res={
           status:jest.fn().mockReturnThis(),
           json:jest.fn()

       }
       
       const mockedInput=jest.fn().mockReturnThis() 
       const mockedExecute=jest.fn().mockResolvedValue({user});
       const mockedRequest={
        input:mockedInput,
        execute:mockedExecute
   }
   const mockedPool={
    request:jest.fn().mockReturnValue(mockedRequest)

}

jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockedPool as never);

await getOneUser(req as unknown as Request ,res as any)

expect(res.json).toHaveBeenCalled("")
    })

})

 