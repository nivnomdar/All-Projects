import Game from "../Modals/GameModal";

export class GameState {
    public allGames: Game[] = [];
    public allFilteredGames: Game[] = [];




}

export enum GameActionType {
    addGame = "addGame",
    deleteGame = "deleteGame",
    searchGame = "searchGame",
    downloadGames = "downloadGames",
    updateGame = "updateGame",
    filteredGames = "filteredGames"

}

export interface GameAction {
    type: GameActionType;
    payload?: any;
}

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

  export function filteredGamesAction(allFilteredGames: Game[]) {
    return { type: GameActionType.filteredGames, payload: allFilteredGames};
}

export function GameReducer(
    currentState: GameState = new GameState(),
    action: GameAction
): GameState {
    const newState = { ...currentState };


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

        case GameActionType.filteredGames: newState.allGames = action.payload;
        break;
    

}
return newState;
}