import { createFeatureSelector, createSelector } from '@ngrx/store';
import { state } from '@angular/animations';
import { PaginationState } from './app.state';

export const getPaginationState = createFeatureSelector<PaginationState>('pagination');

export const getTcount = createSelector(
    getPaginationState,
    (state) => {
        return state.tcount;
    }
)

export const getPage = createSelector(
    getPaginationState,
    (state) => state.page
)