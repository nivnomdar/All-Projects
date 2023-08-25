import axios from "axios";
import Note from "../modal/NoteModal";
import { Dispatch } from "redux";

//state of notes
export class NoteState {
    public allNotes: Note[] = [];
    
}

//what action i will use...
export enum NoteActionType {
    addNote = "addNote",
    deleteNote = "deleteNote",
    searchNote = "searchNote",
    downloadNotes = "downloadNotes",// להוריד ולקבל את כל השירים. יפעל פעם אחת לאורך כל האפליקצייה.
}

//action data structure
export interface NoteAction {
    type: NoteActionType;
    payload?: any;
}

//which function i will dispatch
export function addNoteAction(newNote: Note): NoteAction {
    return { type: NoteActionType.addNote, payload: newNote }
}

// export function deleteNoteAction (id: number): NoteAction {
//     console.log("Deleting note with ID:", id);
//     return { type: NoteActionType.deleteNote, payload: id };
// }

// ...

export function deleteNoteAction(id: number): (dispatch: Dispatch<NoteAction>) => Promise<void> {
  return async (dispatch: Dispatch<NoteAction>) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/notes/deleteNoteById/${id}`);
      dispatch({ type: NoteActionType.deleteNote, payload: id });
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };
}

export function searchNoteAction (noteName: string): NoteAction {
    return { type:NoteActionType.searchNote, payload: noteName };
}

export function downloadNoteAction (allNotes: Note[]){
    return { type: NoteActionType.downloadNotes, payload: allNotes };
}

//reducer - we must use the function signature
export function NoteReducer(
    currentState: NoteState = new NoteState(),
    action: NoteAction
    ): NoteState {
        const newState = { ...currentState };
        switch (action.type) {
            case NoteActionType.addNote:
                newState.allNotes = [...newState.allNotes, action.payload];
                break;

            case NoteActionType.deleteNote:
                newState.allNotes = [...newState.allNotes].filter(
                    (item) => item.id != action.payload
                );
                break;

                case NoteActionType.searchNote:
                    newState.allNotes = newState.allNotes.filter((item) => 
                    item.name.includes(action.payload)
                    );
                    break;

                    case NoteActionType.downloadNotes: newState.allNotes = action.payload;
                    break;

        }

return newState;

        
    }
