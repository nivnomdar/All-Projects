import { combineReducers } from "redux";
import { GameReducer } from "./GamesReducer";
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UsersReducer";
import thunk from 'redux-thunk';


const reducers = combineReducers({
    games: GameReducer,
    users: UserReducer,
});

const initialState = {
    games: {
      allGames: [], // מצב התחלתי ל defult
      allFilteredGames: [],
      isTopRatedFilter: false, 
      allGamesByCategory: [],
    },
    users: {
      allUsers: [],    },
  };

export const gamesWeb = configureStore({
    reducer: reducers,
    preloadedState: initialState, // Provide the initial state here
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), 
})