//add song, update song, delete song, getSongById, getAllSongs

import Song from "../Models/Song";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

//get
const getAllSongs = async () => {
  console.log("in song logic")
  // const SQLcmd = "SELECT * FROM songs";
  const SQLcmd = `
  SELECT songs.*, category.name as categoryName
  FROM songs JOIN category
  ON songs.category = category.id

  `;
  const data = await dal_mysql.execute(SQLcmd);
  // console.log(data);
  return data;
};

//get
const getSongById = async (id: number) => {
  // const SQLcmd = `SELECT * FROM songs WHERE id=${id}`;
  const SQLcmd = `
  SELECT songs.*, category.name as categoryName
  FROM songs JOIN category
  ON songs.category = category.id
  WHERE id=${id}
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

//delete
const deleteSongById = async (id: number) => {
  const SQLcmd = `DELETE FROM songs WHERE id=${id}`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
}

//post
const addSong = async (newSong: Song)=>{
  const SQLcmd = `
  INSERT INTO songs
  (description, img, title, url)
  VALUES
  ('${newSong.description}','${newSong.img}',
   '${newSong.title}','${newSong.url}')
  `;
console.log(SQLcmd);
// ok packet - מחזיר לי את ה insert id
const result: OkPacket = await dal_mysql.execute(SQLcmd);
return result.insertId;
};


//put
const updateSong = async (song: Song)=>{
  const SQLcmd =  `
  UPDATE songs 
  SET description = '${song.description}', 
  img = '${song.img}', 
  title = '${song.title}', 
  url = '${song.url}'
  WHERE id = ${song.id};
  `;
  await dal_mysql.execute(SQLcmd);
  return true;
}





export { getAllSongs, getSongById , deleteSongById, addSong, updateSong};