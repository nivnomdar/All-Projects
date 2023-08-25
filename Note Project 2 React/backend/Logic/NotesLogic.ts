import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";
import Note from "../Models/NoteModal";


// allnotes, add, update, delete, getbyid
// פונה לאסקיואל אחרי התחברות בעזרת הקונפיג והדל


//get
const getAllNotes = async ()=>{
    const SQLcmd = `SELECT * FROM mynotes`;
    const data = await dal_mysql.execute(SQLcmd);
    return data;
}

//get
const getNoteById = async (id:number)=>{
    const SQLcmd = `SELECT * FROM mynotes WHERE id=${id}`;
    const data = await dal_mysql.execute(SQLcmd);
    return data;
}

//delete
const deleteNoteById = async (id: number) => {
    const SQLcmd = `DELETE FROM mynotes WHERE id=${id}`;
    const result = await dal_mysql.execute(SQLcmd);
    return result;
    // const data = await dal_mysql.execute(SQLcmd);
    // return data;
}

//post
const addNote = async (newNote: Note) =>{
    const SQLcmd = `
    INSERT INTO mynotes
    (name, date, time)
    VALUES
    ('${newNote.name}',
    '${newNote.date}','${newNote.time}')
    `;
    
    console.log(SQLcmd);
        // ok packet - מחזיר לי את ה insert id
    const result: OkPacket = await dal_mysql.execute(SQLcmd);
    return result.insertId;
}

// put
const updateNote = async (note: Note)=>{
    const SQLcmd = `
    UPDATE mynotes
    SET name = '${note.name}',
    date = '${note.date}',
    time = '${note.time}'
    WHERE (id = '${note.id}');
    `;

    // UPDATE `notes`.`mynotes` 
    // SET `name` = 'Fix Delete',
    //  `date` = '10/06/2023', 
    //  `time` = '10:00' 
    //  WHERE (`id` = '3');
    // UPDATE songs
    // SET title = 'Into the shadow with cluch orechestra' 
    // WHERE (id = '2');

    await dal_mysql.execute(SQLcmd);
    return true;

}




export { getAllNotes, getNoteById, deleteNoteById, addNote, updateNote };