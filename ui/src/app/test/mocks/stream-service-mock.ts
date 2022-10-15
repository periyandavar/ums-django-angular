import { Pagination } from '../../shared/model/pagination-item';
import { asyncData } from '../../../../../sample/src/app/test-helper';
import { ResponseData } from '../../shared/model/response-data';
import { DropdownOption } from '../../shared/model/dropdown-option';
import { Stream } from '../../module/stream/model/stream';
export class MockStreamService {
    stream: Stream = {id: 1, value: "BBA", status: true}
    getStreams(page: number = 1, limit: number = 5) {
        // return this.http.get<Pagination<Stream>>(
        //   `${this.url}?page=${page}&limit${limit}`
        // );
        const streams:Pagination<Stream> = {data:[this.stream], tcount: 1};
        return asyncData(streams);
      }

      getStream(id: number) {
        return asyncData(this.stream);
      }
    
      updateStream(id: number, data: any) {
        // return this.http.put<ResponseData<string>>(`${this.url}/${id}`, data);
        const result:ResponseData<string> = new ResponseData(false, "success");
        return asyncData(result);
      }
    
      addStream(data: any) {
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