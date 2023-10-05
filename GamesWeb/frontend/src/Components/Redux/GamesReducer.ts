import Game from "../Modals/GameModal";

export class GameState {
    public allGames: Game[] = [];
    public allFilteredGames: Game[] = [];
    public isTopRatedFilter: boolean = false; // top-rated filter state
    public allGamesByCategory: Game[] = [];
}

//-----------------------------------------------------------

export enum GameActionType {
    addGame = "addGame",
    deleteGame = "deleteGame",
    searchGame = "searchGame",
    downloadGames = "downloadGames",
    updateGame = "updateGame",
    topRatedFilter = "topRatedFilter",
    selectedCategory = "selectedCategory",
}

export interface GameAction {
    type: GameActionType;
    payload?: any;
}

//-----------------------------------------------------------

export function addGameAction(newGame: Game): GameAction {
    return { type: GameActionType.addGame, payload: newGame };
  }

  export function deleteGameAction(game_id: number): GameAction {
    return { type: GameActionType.deleteGame, payload: game_id };
  }

export function searchGameAction(text: string): GameAction {
    return { type: GameActionType.searchGame, payload: text};
}

export function downloadGamesAction(allGames:Game[]){
    return {type: GameActionType.downloadGames, payload: allGames};
  }

  export function updateGameAction(updatedGame: Game): GameAction {
    return { type: GameActionType.updateGame, payload: updatedGame };
  }


  export const topRatedGamesAction = (isTopRated: boolean): GameAction => ({
   type: GameActionType.topRatedFilter,
   payload: isTopRated
  });

  export function selectedCategoryAction (category: string): GameAction {
    return {type: GameActionType.selectedCategory, payload: category}
  };



//-----------------------------------------------------------

export function GameReducer(
    currentState: GameState = new GameState(),
    action: GameAction
): GameState {
    const newState = { ...currentState };

//-----------------------------------------------------------

switch (action.type) {
    case GameActionType.addGame:
      newState.allGames = [ ...newState.allGames, action.payload];
    break;

    case GameActionType.deleteGame:
      newState.allGames = [ ...newState.allGames].filter(
        (item) => item.game_id != action.payload
      );
    break;

        //Search
    case GameActionType.searchGame:
    newState.allFilteredGames = newState.allGames.filter((game) => 
    game.game_name.toLowerCase().includes(action.payload)
    );
    console.log("Redux Search Complete. Games matched:", newState.allFilteredGames.length);
    break;
    
    case GameActionType.downloadGames: newState.allGames = action.payload;
    break;

    case GameActionType.updateGame:
      newState.allGames = newState.allGames.map((game) =>
      game.game_id === action.payload.game_id ? action.payload : game
      );
    break;


    case GameActionType.topRatedFilter:
      newState.isTopRatedFilter = action.payload;
      console.log("Redux Games matched:", newState.isTopRatedFilter);
    break;

    case GameActionType.selectedCategory:
      newState.allGamesByCategory =  newState.allGames.filter((game) => 
      game.categories.split(", ").map((category) => category.trim()).includes(action.payload));
      console.log("Redux Category: ", newState.allGamesByCategory.length)
    break;


}
return newState;
}