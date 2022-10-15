import { createAction, props } from '@ngrx/store';
import { User } from '..';
import { Pagination, StatusChange } from '../../../shared';
import { Update } from '@ngrx/entity';

export const loadUsers = createAction("[User API] load users", props<{page:number}>());
export const loadUsersSuccess = createAction("[User API] users loaded successfully", props<{user:Pagination<User>}>());
export const loadUsersFailure = createAction("[User API] an error occured on loading users", props<{error:any}>());
export const addUser = createAction("[User API] add new user", props<{data:any}>());
export const addUserSuccess = createAction("[User API] new user is added successfully", props<{id:number, data: any}>());
export const addUserFailure = createAction("[User API] an error occured on adding user", props<{error:any}>());
export const loadUserById = createAction("[User API] fetch user ny id");
export const loadUserByIdFailure = createAction("[User API] an error occured on fetching user by id", props<{error:any}>());
export const loadUserByIdSuccess = createAction("[User API] user is fetched by id successfully");;
export const updateUser = createAction("[User API] update user",props<{id:number, data: any}>());
export const updateUserSuccess = createAction("[User API] user is updated successfully",props<{update: Update<User>}>());
export const updateUserFailure = createAction("[User API] an error occured on updating user", props<{error:any}>());
export const deleteUser = createAction("[User API] delete user", props<{id:number}>())
export const deleteUserSuccess = createAction("[User API] user is deleted successfully", props<{id:number}>());
export const deleteUsersFailure = createAction("[User API] an error occured on deleting user", props<{error:any}>());
export const changeUserStatus = createAction("[User API] change user status", props<{id:number, status: boolean}>())
export const changeUserStatusSuccess = createAction("[User API] user status changed successfully", props<{id:number, status:boolean}>());
export const changeUserStatusFailure = createAction("[User API] an error occured on changing user satus", props<{error:any}>());