import { createAction, props } from '@ngrx/store';
export const actionSuccess = createAction("[Gender Page] success");
export const actionFailed = createAction("[Gender Page] Failure");

export const changeGenderStatus = createAction("[Gender API] change course status", props<{id:number, status: boolean}>())
export const changeGenderStatusSuccess = createAction("[Gender API] course status changed successfully", props<{id:number, status:boolean}>());
export const changeGenderStatusFailure = createAction("[Gender API] an error occured on changing course satus", props<{error:any}>());