import { createAction, props } from '@ngrx/store';
import { Stream } from '..';
import { Pagination, StatusChange } from '../../../shared';
import { Update } from '@ngrx/entity';

export const loadStreams = createAction("[Stream API] load streams", props<{page:number}>());
export const loadStreamsSuccess = createAction("[Stream API] streams loaded successfully", props<{stream:Pagination<Stream>}>());
export const loadStreamsFailure = createAction("[Stream API] an error occured on loading streams", props<{error:any}>());
export const addStream = createAction("[Stream API] add new stream", props<{data:any}>());
export const addStreamSuccess = createAction("[Stream API] new stream is added successfully", props<{id:number, data: any}>());
export const addStreamFailure = createAction("[Stream API] an error occured on adding stream", props<{error:any}>());
export const loadStreamById = createAction("[Stream API] fetch stream ny id");
export const loadStreamByIdFailure = createAction("[Stream API] an error occured on fetching stream by id", props<{error:any}>());
export const loadStreamByIdSuccess = createAction("[Stream API] stream is fetched by id successfully");;
export const updateStream = createAction("[Stream API] update stream",props<{id:number, data: any}>());
export const updateStreamSuccess = createAction("[Stream API] stream is updated successfully",props<{update: Update<Stream>}>());
export const updateStreamFailure = createAction("[Stream API] an error occured on updating stream", props<{error:any}>());
export const deleteStream = createAction("[Stream API] delete stream")
export const deleteStreamSuccess = createAction("[Stream API] stream is deleted successfully");
export const deleteStreamsFailure = createAction("[Stream API] an error occured on deleting stream", props<{error:any}>());
export const changeStreamStatus = createAction("[Stream API] change stream status", props<{id:number, status: boolean}>())
export const changeStreamStatusSuccess = createAction("[Stream API] stream status changed successfully", props<{id:number, status:boolean}>());
export const changeStreamStatusFailure = createAction("[Stream API] an error occured on changing stream satus", props<{error:any}>());