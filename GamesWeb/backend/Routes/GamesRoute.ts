import express, {NextFunction, Request, Response } from "express";
import { addGame, deleteByID, getAllGames, getGameByID, updateGame } from "../Logic/GamesLogic";


const gamesRouter = express.Router();

gamesRouter.get("/allGames", async(request:Request, response: Response, next: NextFunction)=>{
    console.log("in Games route");

    return response.status(200).json(await getAllGames());
    // const gamesData = await getAllGames();
    // return response.status(200).json(gamesData.data);
        //http://localhost:4000/api/Games/allGames

})



gamesRouter.get("/gameById/:id",
    async(request:Request, response: Response, next: NextFunction)=>{
    const GameID = +request.params.id;
    console.log(`get id: ${GameID}.`);
    return response.status(200).json(await getGameByID(GameID));
        // http://localhost:4000/api/Games/GameById/333

});


gamesRouter.delete("/deleteById/:id",
async(request: Request, response: Response, next: NextFunction)=>{
const GameID = +request.params.id;
console.log(`deleted id: ${GameID}.`);
const gameData = await deleteByID(GameID);
return response.status(200).json(gameData.data);

}
)



gamesRouter.post(
    "/addGame",
    async (request: Request, response: Response, next: NextFunction) => {
        const newGame = request.body;
        console.log(newGame);

        const result = await addGame(newGame);
        return response.status(201).json(`${result}`);
        //http://localhost:4000/api/Games/addGame

      }
      );

      // const fetchAndInsertGames = async () => {
      //   try {
      //     console.log("Fetching ALL GAMES data...");
      //     const gamesData = await getAllGames();
      
      //     // Loop through the fetched data and insert each game into the database
      //     for (const gameData of gamesData.data) {
      //       const newGame = new Game(
      //         gameData.id,
      //         gameData.title,
      //         gameData.thumbnail,
      //         gameData.short_description,
      //         gameData.release_date,
      //         gameData.publisher,
      //         gameData.genre,
      //         gameData.game_url,
      //         gameData.freetogame_profile_url,
      //         gameData.developer,
      //         gameData.platform
      //       );
      //       await addGame(newGame);
      //     }
      
      //     console.log("All games inserted into the 'allgames' table successfully!");
      //   } catch (error) {
      //     console.error("Error fetching and inserting games:", error);
      //   }
      // };
      
      // // Call the fetchAndInsertGames function to start the process
      // fetchAndInsertGames();
    

gamesRouter.put(
    "/updateGame",
    async (request: Request, response: Response, next: NextFunction) => {
        const game = request.body;
        console.log(game);
        return response.status(201).json(await updateGame(game));
        //http://localhost:4000/api/Games/updateGame
    })



export default gamesRouter;