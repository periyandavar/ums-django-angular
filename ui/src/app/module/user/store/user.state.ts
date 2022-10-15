import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '..';

export const USER_STORE_NAME = "users";

export interface UserState extends EntityState<User> {
    tcount: number
}

export const UserAdapter = createEntityAdapter<User>(

);

export const userInitialState: UserState = UserAdapter.getInitialState({
    tcount: 0
});
