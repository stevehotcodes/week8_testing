import Router from 'express'
import { deleteUser, getOneUser, registerNewUser, updateUser } from '../controllers/userControllers'




const userRouter=Router()

userRouter.get("/user",getOneUser)
userRouter.post("/register",registerNewUser);
userRouter.post("/update",updateUser)
userRouter.delete("/delete",deleteUser)




export default userRouter