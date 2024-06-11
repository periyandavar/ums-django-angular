import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, UserAdapter } from './user.state';
import { getCurrentRoute, RouterStateUrl } from '../../../store/router';

const getUsersState = createFeatureSelector<UserState>('users');

export const userSelectors = UserAdapter.getSelectors();

export const getUsers = createSelector(
    getUsersState,
    userSelectors.selectAll
);

export const getTcount = createSelector(
    getUsersState,
    (data)=> {
        return data.tcount;
    }
)

export const getUserEntities = createSelector(
    getUsersState,
    userSelectors.selectEntities
);

// export const getUserById = createSelector(
//     userSelectors.selectEntities,
//     getCurrentRouteState,
//     (users, route: RouterStateUrl) => {
//         return users ? users[route.params['id']]: null;
//     }

// )

export const getCurrentUser = createSelector(
    getUsers,
    getCurrentRoute,
    (users, route:RouterStateUrl) => {
        return users ? users.find((user) => 
            user.id === parseInt(route.params["id"] as any, 10)
        ): null;
    }
)