import { BloodGroup } from '../../blood-group/model/blood-group';
import { Gender } from '../../gender/model/gender';
export class User {
  constructor(
    public id: number,
    // public firstName: string,
    // public lastName: string,
    public first_name: string,
    public last_name: string,
    public email: any[],
    public mobile: any[],
    public dob: any,
    public educationDetails: any[],
    // public bloodGroup: BloodGroup,
    public blood_group: BloodGroup,
    public gender: Gender
  ) {}
}
