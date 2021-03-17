import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";
import Vacation from "../models/Vacation";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.ChangeLoginStatus:
            newAppState.userType = action.payload;
            break;
        case ActionType.GetAllVacations:
            newAppState.vacations = action.payload;
            break;
        case ActionType.AddVacation:
            newAppState.vacations.push(action.payload);
            break;
        case ActionType.DeleteVacation:
            newAppState.vacations = newAppState.vacations.filter((vacation) => {
                return vacation.id !== action.payload;
            });
            break;
        case ActionType.UpdateVacation:
            for (let i = 0; i < newAppState.vacations.length; i++) {
                if (newAppState.vacations[i].id === action.payload.id) {
                    let vacation : Vacation;
                    vacation = action.payload;
                    console.log(vacation);
                    if (newAppState.vacations[i].isFollowing){
                        vacation.isFollowing = true;
                    }
                    else{
                        vacation.isFollowing = false;
                    }
                    newAppState.vacations.splice(i, 1, vacation);
                }
            }
            break;
        case ActionType.follow:
            newAppState.vacations.map((vacation) => { 
                
                if (vacation.id === action.payload) {
                    vacation.followers++;
                    vacation.isFollowing = true;
                }
            });
            break;
        case ActionType.unfollow:
            newAppState.vacations.map((vacation) => {
                if (vacation.id === action.payload) {
                    vacation.followers--;
                    vacation.isFollowing = false;
                }
            });
            break;
        case ActionType.getSocket:
            newAppState.socket = action.payload;
            break;
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}