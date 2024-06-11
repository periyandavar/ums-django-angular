import { createReducer, on } from '@ngrx/store';
import { genderActions } from '.';
const _genderReducer = createReducer(
    on(genderActions.changeGenderStatusSuccess, 
        (state, action) => {
            return state;
        })
)

export function genderReducer(state:any, action:any) {
    return _genderReducer(state, action);
}

export const GenderReducerMap = {
    "Gender": genderReducer
}