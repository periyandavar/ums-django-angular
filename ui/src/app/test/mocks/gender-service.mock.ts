import { Pagination } from '../../shared/model/pagination-item';
import { asyncData } from '../../../../../sample/src/app/test-helper';
import { ResponseData } from '../../shared/model/response-data';
import { DropdownOption } from '../../shared/model/dropdown-option';
import { Gender } from '../../module/gender/model/gender';

export class MockGenderService {
  gender: Gender = { id: 1, value: 'BBA', status: true};
  getGenders(page: number = 1, limit: number = 5) {
    // return this.http.get<Pagination<Gender>>(
    //   `${this.url}?page=${page}&limit${limit}`
    // );
    const genders: Pagination<Gender> = { data: [this.gender], tcount: 1 };
    return asyncData(genders);
  }

  getGender(id: number) {
    return asyncData(this.gender);
  }

  updateGender(id: number, data: any) {
    // return this.http.put<ResponseData<string>>(`${this.url}/${id}`, data);
    const result: ResponseData<string> = new ResponseData(false, 'success');
    return asyncData(result);
  }

  addGender(data: any) {
    const result: ResponseData<string> = new ResponseData(false, 'success');
    return asyncData(result);
  }

  changeStatus(id: number, status: boolean) {
    const result: ResponseData<string> = new ResponseData(false, 'success');
    return asyncData(result);
  }
  activeData() {
    let options: DropdownOption[] = [
      {
        id: 1,
        value: 'sample',
      },
    ];
    return asyncData(options);
  }
}
