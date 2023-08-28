import User from "../Modals/UserModal"

export class UserState {
    public allUsers: User [] = [];
}

export enum UserActionType {
    addUser = "addUser",
    deleteUser = "deleteUser",
    downloadUsers = "downloadUsers",
    updateUser = "updateUser",
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}

export function addUserAction(newUser: User) : UserAction {
    return { type: UserActionType.addUser, payload: newUser };
}

export function deleteUserAction(user_id: number): UserAction {
    return { type: UserActionType.deleteUser, payload: user_id }
}

export function downloadUsersAction(allUsers: User[]){
    return {type: UserActionType.downloadUsers, payload: allUsers };
}

export function updateUserAction(updatedUser: User): UserAction {
    return { type: UserActionType.updateUser, payload: updatedUser };
}


export function UserReducer(
    currentState: UserState = new UserState(),
    action: UserAction
): UserState {
    const newState = { ...currentState };

switch (action.type) {
    case UserActionType.addUser:
        newState.allUsers = [ ...newState.allUsers, action.payload];
        break;

        case UserActionType.deleteUser:
            newState.allUsers = [ ...newState.allUsers].filter(
                (item) => item.user_id != action.payload            
            );
            break;

            case UserActionType.downloadUsers: newState.allUsers = action.payload;
            break;

            case UserActionType.updateUser:
                newState.allUsers = newState.allUsers.map((user) =>
                user.user_id === action.payload.user_id ? action.payload : user);
                break;
}
return newState;


}