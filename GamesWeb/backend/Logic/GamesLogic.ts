import { OkPacket } from 'mysql';

import Game from "../Models/GameModal";
// import dal_mysql from '../../../Niv Nomdar/backend/Utils/dal_mysql';
// import dal_mysql from '../../backend/Utils/dal_mysql';
import dal_mysql from "../Utils/dal_mysql";

// const allGamesURL = "https://www.freetogame.com/api/games";
// const getIdURL = `https://www.freetogame.com/api/game?id=${id}`;  // BYID

//get
const getAllGames = async ()=>{
    const SQLcmd = `SELECT * FROM video_games`;
    const data = await dal_mysql.execute(SQLcmd);
    console.log("fetching ALL GAMES data...");
    return data;
    // return await axios.get("https://www.freetogame.com/api/games");
    //http://localhost:4000/api/Games/allGames
}


const getGameByID = async (id: number)=>{
    const SQLcmd = `SELECT * FROM video_games WHERE game_id=${id}`;
    const data = await dal_mysql.execute(SQLcmd);
    console.log("fetching ID GAME data...");
    return data;
    // http://localhost:4000/api/Games/GamesById/333

}


const deleteByID = async (game_id: number) => {
    console.log("fetching delete Game");
    const SQLcmd = `DELETE FROM video_games WHERE game_id=${game_id}`;
    const data = await dal_mysql.execute(SQLcmd);
    return data;
        // http://localhost:4000/api/Games/deleteById/:id
}


const addGame = async (newGame: Game)=>{
    const SQL = `
    INSERT INTO video_games
    (game_name, release_date, categories, platforms, developer,
        publisher, short_description, rating, price, multiplayer,
        mod_support, achievements, image_url)
    VALUES
    ('${newGame.game_name}',
    '${newGame.release_date}',
    '${newGame.categories}',
    '${newGame.platforms}',
    '${newGame.developer}',
    '${newGame.publisher}',
    '${newGame.short_description}',
    '${newGame.rating}',
    '${newGame.price}',
    ${newGame.multiplayer},
    ${newGame.mod_support},
    ${newGame.achievements},
    '${newGame.image_url}'
    );
    `;
`
//   INSERT INTO video_games
//   (game_name, release_date, categories, platforms, developer,
//   publisher, short_description, rating, price, multiplayer,
//   mod_support, achievements, image_url)
// VALUES
//   ('EA FC 24',
//   '2023/09/29',
//   'Sports',
//   'PC, PlayStation, Xbox',
//   'EA Sports',
//   'EA Sports',
//   'A football simulation game offering realistic gameplay and various single and multiplayer modes.',
//   '9.0',
//   '55.99',
//   '0',
//   '0',
//   '1',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBcUJrxP6oGyPGO8Uk_aanQDdUJ3GvCMmq3Fps3_Yl7iDU22AvSxn7uGapJr1sc8Q8ZY0&usqp=CAU');
//   `;
    


    console.log(SQL);
    const result: OkPacket = await dal_mysql.execute(SQL);
    return result.insertId;
}

const updateGame = async (game: Game) => {
    const SQL =`
    UPDATE video_games
    SET
    game_name = '${game.game_name}',
    release_date = '${game.release_date}',
    categories = '${game.categories}',
    platforms = '${game.platforms}',
    developer = '${game.developer}',
    publisher = '${game.publisher}', 
    short_description = '${game.short_description}', 
    rating = '${game.rating}',
    price = '${game.price}', 
    multiplayer = ${game.multiplayer},
    mod_support = ${game.mod_support}, 
    achievements = ${game.achievements}, 
    image_url = '${game.image_url}'
    WHERE game_id = ${game.game_id}
    `;

    await dal_mysql.execute(SQL);
    return true;
}


export {getAllGames, getGameByID, addGame, deleteByID, updateGame};