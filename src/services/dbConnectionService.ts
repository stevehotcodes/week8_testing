import mssql from 'mssql'
import { dbConfig } from '../config/dbConfig'


export async function dbConnectService(){
    try {
         let pool = await mssql.connect(dbConfig);
         console.log("database connected successfully")
          return pool; 
    } catch (error) {
          console.log(error)
    }

}