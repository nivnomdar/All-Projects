import { addUser, checkLogin, getUserList } from '../Logic/UsersLogic';
import express, {NextFunction, Request, Response } from "express";
import User from '../Models/UserModal';


const usersRouter = express.Router();

// כל המשתמשים ללא סיסמאות
usersRouter.get(
    "/allNoPass",
    async (request:Request, response: Response, next: NextFunction)=>{
        return response.status(200).json(await getUserList());
    //  http://localhost:4000/api/users/allNoPass

    }
)

//  http://localhost:4000/api/users/addUser
usersRouter.post(     //POST
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


//http://localhost:4000/api/users/checkLogin
// אימייל וסיסמא

usersRouter.post(
    "/checkLogin",
    async (request:Request, response: Response, next: NextFunction)=>{
        const userLogin: User = request.body;
        
        const user = await checkLogin(userLogin);
        if (user) {
        const userID = user.user_id;
        console.log("LOGIC: user id logged in: ", userID);
        return response.status(200).json({ message: `${userLogin.email} Logged in!`, userID });
        } else {
            return response.status(401).json({ message: "Email or password is incorrect." });
        }});

export default usersRouter;