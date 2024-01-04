import express, {NextFunction, Request, Response} from "express";
import { carInfo } from "../Logic/CarFinder";
import axios from "axios";



const carRouter = express.Router();



carRouter.get("/find/:carNumber",
async (request:Request, response:Response, next:NextFunction)=>{
    const carNumber = request.params.carNumber;
    console.log(carNumber);
    response.status(200).json(carInfo(carNumber));
});


export default carRouter;