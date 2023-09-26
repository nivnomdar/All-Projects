import { combineReducers } from "redux";
import { GameReducer } from "./GamesReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UsersReducer";


const reducers = combineReducers({
    games: GameReducer,
    users: UserReducer,
});

const initialState = {
    games: {
      allGames: [], // Initialize with an empty array or some default data
      allFilteredGames: [],
    },
    users: {
      allUsers: [],    },
  };

export const gamesWeb = configureStore({
    reducer: reducers,
    preloadedState: initialState, // Provide the initial state here
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})