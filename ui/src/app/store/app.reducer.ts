import { ActionReducerMap, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './';
import { SHARED_STATE_NAME } from '../shared/store/shared.selector';
import { SharedReducer } from '../shared/store/shared.reducer';
import { initialPaginationState } from './app.state';
import { setPage, setTcount } from './app.action';
export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  "pagination": paginationReducer
};

const _paginationReducer = createReducer(
  initialPaginationState,
  on(setPage, (state, action) => {
    const updatedPagination = {
      ...state,
      page: action.page
    }
    return updatedPagination;
  }),
  on(setTcount, (state, action) => {
    const updatedPagination = {
      ...state,
      tcount: action.tcount
    }
    return updatedPagination;
  })
);

export function paginationReducer(state: any, action:any) {
 return  _paginationReducer(state, action);
}

function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    // console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
