import { addUser, checkLogin, getAllUsers, getUserList } from '../Logic/UsersLogic';
import express, {NextFunction, Request, Response } from "express";

const usersRouter = express.Router();

usersRouter.get(
    "/allusers",
    async (request:Request, response: Response, next: NextFunction)=>{
        return response.status(200).json(await getAllUsers());
        // http://localhost:4000/api/users/allusers
    }
)

// כל המשתמשים ללא סיסמאות
usersRouter.get(
    "/allNoPass",
    async (request:Request, response: Response, next: NextFunction)=>{
        return response.status(200).json(await getUserList());
        // http://localhost:4000/api/users/allNoPass
    }
)

// http://localhost:4000/api/users/addUser
usersRouter.post(
    "/addUser",
    async (request:Request, response: Response, next: NextFunction)=>{
        const newUser = request.body;
        const result = await addUser(newUser);
        return response.status(201).json(`${result}`);
    }

    // {
    //     "first_name": "Lionel",
    //     "last_name": "Messi",
    //     "email": "messi@gmail.com",
    //     "password": "king!"
    // }
);




export default usersRouter;