import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router/';
import { SHARED_STATE_NAME } from '../shared/store/shared.selector';
import { SharedState } from '../shared/store/shared.state';

export interface PaginationState {
  tcount: number,
  page: number
}
export interface AppState {
    router: RouterReducerState<RouterStateUrl>;
    [SHARED_STATE_NAME]: SharedState;
    pagination: PaginationState
  }

  
  export const initialPaginationState: PaginationState = {
    tcount: 0,
    page: 1
  };