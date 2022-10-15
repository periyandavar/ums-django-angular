import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BloodGroupState, BLOOD_GROUP_STORE } from './';

const getBloodGroupState =
  createFeatureSelector<BloodGroupState>(BLOOD_GROUP_STORE);

export const getBloodGroups = createSelector(getBloodGroupState, (state) => {
  console.log(state);
  return state;
});
