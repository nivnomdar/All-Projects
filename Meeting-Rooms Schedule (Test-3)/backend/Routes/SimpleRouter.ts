import express , {NextFunction,Request,Response} from "express";
import { Test } from "../Models/Test";
import { sendOK, sendBAD } from "../Logic/TestLogic";

const router = express.Router();

// http://localhost:4000/api/v1/checkOK
// http://localhost:4000/api/v1/checkBAD


// GET, POST, PUT, DELETE
//CRUD - Create,read,update,delete


//GET
router.get(
    "/checkOK",
    async (request:Request, response:Response, next:NextFunction)=>{
    response.status(200).json(sendOK("GET"));
}) // אסינכרוני כי אני שולח בקשה ולא יודע מתי התשובה תתקבל


router.get(
    "/checkBAD",
    async (request: Request, response:Response, next:NextFunction)=>{
    response.status(400).json(sendBAD("GET"));
})

// DELETE
router.delete(
    "/checkOK",
    async (request:Request, response:Response, next:NextFunction)=>{
    response.status(200).json(sendOK("DELETE"));
}) // אסינכרוני כי אני שולח בקשה ולא יודע מתי התשובה תתקבל


router.delete(
    "/checkBAD",
    async (request: Request, response:Response, next:NextFunction)=>{
    response.status(400).json(sendBAD("DELETE"));
})


// POST
router.post(
    "/checkOK",
    async (request:Request, response:Response, next:NextFunction)=>{
    response.status(200).json(sendOK("POST", request.body));
}) // אסינכרוני כי אני שולח בקשה ולא יודע מתי התשובה תתקבל


router.post(
    "/checkBAD",
    async (request: Request, response:Response, next:NextFunction)=>{
    response.status(400).json(sendBAD("POST"));
})


// PUT
router.put(
    "/checkOK",
    async (request:Request, response:Response, next:NextFunction)=>{
    response.status(200).json(sendOK("PUT"));
}) // אסינכרוני כי אני שולח בקשה ולא יודע מתי התשובה תתקבל


router.put(
    "/checkBAD",
    async (request: Request, response:Response, next:NextFunction)=>{
    response.status(400).json(sendBAD("PUT"));
})




export default router;