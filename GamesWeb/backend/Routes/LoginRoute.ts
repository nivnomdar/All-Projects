import express, {NextFunction, Request, Response } from "express";
import { checkLogin } from "../Logic/UsersLogic";


const loginRouter = express.Router();

// http://localhost:4000/api/login/
    loginRouter.post("/",  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const session = (req.session as any);

    console.log("body :", req.body);
    try {
        // Call your authentication service to verify the user's credentials
        const user = await checkLogin(email, password);
        if (user) {
            console.log(user);
			const userID = user.user_id;
            console.log("Welcome back userID", userID);
            session.role = "Admin";
            res.status(200).json({ success: true , user_id: userID});
            return;

        } else {
            // Return an error response if authentication fails
            console.log("Login falied");
            res.status(401).json({ success: false, error: "Invalid credentials" });
          return;
        }

	} catch (error) {
		console.log(error);
		res.status(403).end();
	}
});


export default loginRouter;