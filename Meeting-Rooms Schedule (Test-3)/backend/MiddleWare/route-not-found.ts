//import
// נקסטפונקשן הוא בעצם מעביר אותי בין מידלוורים אם הכל תקין ואתה רוצה להמשיך למידלוור הבא.
import {Request,Response,NextFunction} from "express";

//error->modal
import { RouteNotFound } from "../Models/Clients-Errors";

//middle ware function שיטפל בבעיות האלה
const ErrorHandler = (
    request:Request,
    response:Response,
    next:NextFunction
    ) => {
    const err = new RouteNotFound(request.originalUrl) //מקבל יואראל של אותה כתובת
    next(err)
};

export default ErrorHandler;