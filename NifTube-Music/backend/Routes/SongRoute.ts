import express, { NextFunction, Request, Response } from "express";
import { addSong, deleteSongById, getAllSongs, getSongById, updateSong} from "../Logic/SongsLogic";

const songRouter = express.Router();

songRouter.get( // לקבל את כל השירים
    //הראוט עצמו
  "/listSongs",
  //שורה קבועה
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in song route");
    return response.status(200).json(await getAllSongs());
  }
);

songRouter.get( // לקבל אלי על פי איידי
  "/songById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songID = +request.params.id;
    console.log(`get id: ${songID}.`)

    return response.status(200).json(await getSongById(songID));
  }
);

songRouter.delete( //מחיקה
  "/deleteById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songID = +request.params.id;
    console.log(`Deleted id: ${songID}.`)
    return response.status(200).json(await deleteSongById(songID));

  }
);


songRouter.post( // להוסיף
    "/addSong",
    async (request: Request, response: Response, next: NextFunction) => {
      const newSong = request.body;
      const result = await addSong(newSong);
      return response.status(201).json(`${result}`);
    }
    );

songRouter.put( // עדכון update
  "/updateSong",
  async (request: Request, response: Response, next: NextFunction) => {
  const song = request.body; // צריך להכניס בודי כשמעדכנים תוכן.
return response.status(201).json(await updateSong(song));
}
  );




export default songRouter;