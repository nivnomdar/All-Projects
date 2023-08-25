import express, {NextFunction, Request, Response } from "express";
import { addNote, deleteNoteById, getAllNotes, getNoteById, updateNote } from "../Logic/NotesLogic";

const notesRouter = express.Router();


// לקבל את כל הנוטס
notesRouter.get("/listNotes", async(request:Request, response: Response, next: NextFunction)=>{
    console.log("in note route");
    return response.status(200).json(await getAllNotes());
})

// לקבל אלי על פי איידי
notesRouter.get("/getNoteById/:id", async(request:Request, response: Response, next: NextFunction)=>{
    const NoteID = +request.params.id;
    return response.status(200).json(await getNoteById(NoteID));
})


notesRouter.delete(  //מחיקה
    "/deleteNoteById/:id", 
    async(request:Request, response: Response, next: NextFunction)=>{
    const NoteID = +request.params.id;
    // return response.status(200).json(await deleteNoteById(NoteID));

    const result = await deleteNoteById(NoteID);
    return response.status(200).json(result);

})



notesRouter.post("/addNote",  // להוסיף
async (request: Request, response: Response, next: NextFunction) => {
    const newNote = request.body;
    const result = await addNote(newNote);
    return response.status(201).json(`${result}`);

// לדוגמא נכתוב בבודי עם פוסט:
// {
//     "name": "AddNote",
//     "date": "06/06/2023",
//     "time": "08:00"
// }
})



notesRouter.put( // עדכון update
    "/updateNote",
    async (request: Request, response: Response, next: NextFunction) => {
    console.log("in updateNote");
    const note = request.body;
    console.log (note);
    return response.status(201).json(await updateNote(note));

    // לדוגמא נשים את זה בבודי וזה ישנה על פי האיידי עם פוט
    // {
    //     "id": 3,
    //     "name": "FIX DELETE",
    //     "date": "05/05/2555",
    //     "time": "15:55"
    //   }

});


export default notesRouter;