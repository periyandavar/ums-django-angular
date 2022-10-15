import { createAction, props } from '@ngrx/store';
export const setPage = createAction("[Pagination] set page number", props<{page: number}>());
export const setTcount = createAction("[Pagination] set total count", props<{tcount: number}>());