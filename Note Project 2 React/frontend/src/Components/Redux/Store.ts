import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { NoteReducer } from "./NoteReducer";


//which reducer should i use
const reducers = combineReducers ({
    notes: NoteReducer,
});


//combine all reducers to one single store....
export const notes = configureStore ({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({ serializableCheck: false }),
})