import { createAction, props } from '@ngrx/store';
import { BloodGroup } from '../';
import { Pagination } from '../../../shared';
import { BloodGroupStatusChange } from '../';

export const loadBloodGroups = createAction(
  '[BloodGroup API] load blood groups',
  props<{ page: number }>()
);
export const loadBloodGroupsSuccess = createAction(
  '[BloodGroup API] blood groups loaded successfully',
  props<{ bloodGroup: Pagination<BloodGroup> }>()
);
export const loadBloodGroupsFailure = createAction(
  '[BloodGroup API] an error occured on loading blood groups',
  props<{ error: any }>()
);
export const addBloodGroup = createAction(
  '[BloodGroup API] add new blood group',
  props<{ data: any }>()
);
export const addBloodGroupSuccess = createAction(
  '[BloodGroup API] new Blood is added successfully',
  props<{ id: number; data: any }>()
);
export const addBloodGroupFailure = createAction(
  '[BloodGroup API] an error occured on adding blood group',
  props<{ error: any }>()
);
export const loadBloodGroupById = createAction(
  '[BloodGroup API] fetch blood group ny id'
);
export const loadBloodGroupByIdFailure = createAction(
  '[BloodGroup API] an error occured on fetching blood group by id',
  props<{ error: any }>()
);
export const loadBloodGroupByIdSuccess = createAction(
  '[BloodGroup API] blood group is fetched by id successfully'
);
export const updateBloodGroup = createAction(
  '[BloodGroup API] update blood group',
  props<{ id: number; data: any }>()
);
export const updateBloodGroupSuccess = createAction(
  '[BloodGroup API] blood group is updated successfully',
  props<{ id: number; data: any }>()
);
export const updateBloodGroupFailure = createAction(
  '[BloodGroup API] an error occured on updating blood group',
  props<{ error: any }>()
);
export const deleteBloodGroup = createAction(
  '[BloodGroup API] delete blood group'
);
export const deleteBloodGroupSuccess = createAction(
  '[BloodGroup API] blood group is deleted successfully'
);
export const deleteBloodGroupsFailure = createAction(
  '[BloodGroup API] an error occured on deleting blood group',
  props<{ error: any }>()
);
export const changeBloodGroupStatus = createAction(
  '[BloodGroup API] change blood group status',
  props<BloodGroupStatusChange>()
);
export const changeBloodGroupStatusSuccess = createAction(
  '[BloodGroup API] blood group status changed successfully',
  props<BloodGroupStatusChange>()
);
export const changeBloodGroupStatusFailure = createAction(
  '[BloodGroup API] an error occured on changing blood group satus',
  props<{ error: any }>()
);
