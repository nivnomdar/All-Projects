import Game from "../Modals/GameModal";

export class GameState {
    public allGames: Game[] = [];
}

export enum GameActionType {
    addGame = "addGame",
    deleteGame = "deleteGame",
    searchGame = "searchGame",
    downloadGames = "downloadGames",
    updateGame = "updateGame",

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


export function searchGameAction(game_name: string): GameAction {
    return { type: GameActionType.searchGame, payload: game_name};
}

export function downloadGamesAction(allGames:Game[]){
    return {type: GameActionType.downloadGames, payload: allGames};
  }

  export function updateGameAction(updatedGame: Game): GameAction {
    return { type: GameActionType.updateGame, payload: updatedGame };
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

    case GameActionType.searchGame:
    newState.allGames = newState.allGames.filter((game) => 
    game.game_name.includes(action.payload)
    );
    break;
    
    case GameActionType.downloadGames: newState.allGames = action.payload;
    break;

    case GameActionType.updateGame:
        newState.allGames = newState.allGames.map((game) =>
          game.game_id === action.payload.game_id ? action.payload : game
        );
        break;
    

}
return newState;
}