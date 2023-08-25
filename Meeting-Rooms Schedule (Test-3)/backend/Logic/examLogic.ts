import dal_mysql from "../Utils/dal_mysql";
import Meeting from "../Models/meeting";
import { OkPacket } from "mysql";


// localhost:4000/api/v1/exam/allteams
// החזרת כל קבוצות הפיתוח
const getAllTeams = async () => {
    const SQL = `SELECT * FROM teams`;
    const data = await dal_mysql.execute(SQL);
    return data;
}

// localhost:4000/api/v1/exam/getMeetingsById/3
// החזרת כל הפגישות של קבוצת פיתוח ספציפית לפי קוד קבוצת פיתוח
const getTeamsById = async (teamid:number) => {
    const SQL = `SELECT * FROM meetings WHERE teamid=${teamid}`;
    const data = await dal_mysql.execute(SQL);
    return data;
}

// localhost:4000/api/v1/exam/addMeeting
//post
const addMeeting = async (newMeeting: Meeting) =>{
    console.log(newMeeting);

    const SQL = `
    INSERT INTO meetings
    (teamid, starttime, endtime, description, room)
    VALUES
    (
    '${newMeeting.teamid}',
    '${newMeeting.starttime}',
    '${newMeeting.endtime}',
    '${newMeeting.description}',
    '${newMeeting.room}'
    )
    `;
    
    console.log(SQL);
        // ok packet - מחזיר לי את ה insert id
    const result: OkPacket = await dal_mysql.execute(SQL);
    return result.insertId;
}





export { getAllTeams,getTeamsById, addMeeting };