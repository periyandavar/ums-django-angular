import { BloodGroup } from '../';

export const BLOOD_GROUP_STORE = 'bloodGroup';

export interface BloodGroupState {
  bloodGroups: BloodGroup[];
  tcount: number;
}

export const bloodGroupInitialState: BloodGroupState = {
  bloodGroups: [],
  tcount: 0,
};
