import express, {NextFunction, Request, Response } from "express";
import { addMeeting, getAllTeams, getTeamsById } from "../Logic/examLogic";


const examRouter = express.Router();

//localhost:4000/api/v1/exam/allteams
// לקבל את כל הנוטס
examRouter.get("/allTeams", async(request:Request, response: Response, next: NextFunction)=>{
    console.log("in note route");
    return response.status(200).json(await getAllTeams());
});

// localhost:4000/api/v1/exam/getMeetingsById/3
// לקבל אלי על פי איידי
examRouter.get("/getMeetingsById/:id", async(request:Request, response: Response, next: NextFunction)=>{
    const id = +request.params.id;
    return response.status(200).json(await getTeamsById(id));
});


// localhost:4000/api/v1/exam/addMeeting
// הוספה
examRouter.post("/addMeeting", 
async (request: Request, response: Response, next: NextFunction) => {
    const newMeeting = request.body;
    const result = await addMeeting(newMeeting);
    return response.status(201).json(`${result}`);

    // {
    //     "teamid": 1,
    //     "starttime": "10:30",
    //     "endtime": "15:00",
    //     "description": "exam",
    //     "room": "Lima Room"
    //   }



});

export default examRouter;