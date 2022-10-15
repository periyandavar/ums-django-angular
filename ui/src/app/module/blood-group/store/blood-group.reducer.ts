import { createReducer, on } from '@ngrx/store';
import { bloodGroupActions, bloodGroupInitialState } from './';

export const _bloodGroupReducer = createReducer(
  bloodGroupInitialState,
  on(bloodGroupActions.loadBloodGroupsSuccess, (state, action) => {
    return {
      ...state,
      bloodGroups: action.bloodGroup.results,
      tcount: action.bloodGroup.count,
    };
  }),

  on(bloodGroupActions.changeBloodGroupStatusSuccess, (state, action) => {
    const updatedBloodGroups = state.bloodGroups.map((bg) => {
      if (action.id == bg.id) {
        return {
          ...bg,
          status: action.status,
        };
      } else {
        return bg;
      }
    });
    return {
      ...state,
      bloodGroups: updatedBloodGroups,
    };
  }),

  on(bloodGroupActions.updateBloodGroupSuccess, (state, action) => {
    const updatedBloodGroups = state.bloodGroups.map((bg) => {
      if (action.id == bg.id) {
        return {
          ...action.data,
          id: action.id,
        };
      } else {
        return bg;
      }
    });
    return {
      ...state,
      bloodGroups: updatedBloodGroups,
    };
  }),

  on(bloodGroupActions.addBloodGroupSuccess, (state, action) => {
    const newBloodGroup = {
      ...action.data,
      id: action.id,
    };
    return {
      ...state,
      bloodGroups: [...state.bloodGroups, newBloodGroup],
    };
  })
);

export function bloodGroupReducer(state: any, action: any) {
  return _bloodGroupReducer(state, action);
}
