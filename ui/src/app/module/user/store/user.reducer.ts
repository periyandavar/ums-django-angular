import { EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from '.';
import { userInitialState, UserAdapter } from '.';
import { User } from '..';
const _userReducer = createReducer(
    userInitialState,
    on(UserActions.addUserSuccess, (state, {id, data}) => {
        const user = {
            ...data,
            id: id
        }
        return UserAdapter.addOne(user, state);
    }),

    // on(UserActions.changeUserStatusSuccess, (state, action) => {

    //     const update:Update<User> = {
    //         id: action.id,
    //         changes: {
    //             ...state.entities[action.id],
    //             status: action.status
    //         }
    //     }
    //     return UserAdapter.updateOne(update, state);
    // }),

    on(UserActions.deleteUser, (state,action) => {
        return UserAdapter.removeOne(action.id, state);
    }),

    on(UserActions.loadUsersSuccess, (state, action) => {
        return UserAdapter.setAll(action.user.results as any, {...state, tcount:action.user.count});
        // return UserAdapter.setAll(action.user.data, {...state, tcount:action.user.tcount});
    }),

    on(UserActions.updateUserSuccess, (state, {update}) => {
        return UserAdapter.updateOne(update, state);
    })
)

export function userReducer(state: any, action: any) {

    return _userReducer(state, action);
}