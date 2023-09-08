import authService from '../../frontend/src/Components/Pages/Login/authService';
import { addUser, checkLogin, getAllUsers, getUserList } from '../Logic/UsersLogic';
import express, {NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'; 


const usersRouter = express.Router();
usersRouter.get(
    "/allusers",
    async (request:Request, response: Response, next: NextFunction)=>{
        return response.status(200).json(await getAllUsers());
    //  http://localhost:4000/api/users/allusers

    }
)

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

usersRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log( email, password);
  
    try {
      // Call your authentication service to verify the user's credentials
      const user = await checkLogin(email, password);
  
      if (user) {
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.user_id }, 's5fff5sA56CC5DS2C5'); // You need to implement this function
  
     // Return the token to the client
     res.status(200).json({ success: true, token });
    } else {
      // Return an error response if authentication fails
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


export default usersRouter;