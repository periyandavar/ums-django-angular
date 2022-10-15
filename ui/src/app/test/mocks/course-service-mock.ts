import { Course } from 'src/app/module/course/model/course';
import { Pagination } from '../../shared/model/pagination-item';
import { asyncData } from '../../../../../sample/src/app/test-helper';
import { ResponseData } from '../../shared/model/response-data';
import { DropdownOption } from '../../shared/model/dropdown-option';
export class MockCourseService {
    course: Course = {id: 1, value: "BBA", status: true, streams: []}
    getCourses(page: number = 1, limit: number = 5) {
        // return this.http.get<Pagination<Course>>(
        //   `${this.url}?page=${page}&limit${limit}`
        // );
        const courses:Pagination<Course> = {data:[this.course], tcount: 1};
        return asyncData(courses);
      }

      getCourse(id: number) {
        return asyncData(this.course);
      }
    
      updateCourse(id: number, data: any) {
        // return this.http.put<ResponseData<string>>(`${this.url}/${id}`, data);
        const result:ResponseData<string> = new ResponseData(false, "success");
        return asyncData(result);
      }
    
      addCourse(data: any) {
        const result:ResponseData<string> = new ResponseData(false, "success");
        return asyncData(result);
      }
    
      changeStatus(id: number, status: boolean) {
        const result:ResponseData<string> = new ResponseData(false, "success");
        return asyncData(result);
      }
      activeData() {
        let options:DropdownOption[] = [{
            id: 1,
            value: "sample"
        }];
        return asyncData(options);
      }
}