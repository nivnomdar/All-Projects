import express, {NextFunction, Request, Response} from "express";
import { carInfo } from "../Logic/CarFinder";
import axios from "axios";



const carRouter = express.Router();



carRouter.get("/find/:carNumber",
async (request:Request, response:Response, next:NextFunction)=>{
    const carNumber = request.params.carNumber; //  מספר הרכב שבוקש.
    response.status(200).json(await carInfo(carNumber)); // מחזיר לי את הנתונים של הרכב יחד עם רספונס בפאונדר
});



export default carRouter;