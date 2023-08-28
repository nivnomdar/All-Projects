import { combineReducers } from "redux";
import { GameReducer } from "./GamesReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UsersReducer";


const reducers = combineReducers({
    games: GameReducer,
    users: UserReducer,
});

export const gamesWeb = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})