import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stream } from '../index';
import { environment } from 'src/environments/environment';
import {
  DropdownOption,
  Pagination,
  ResponseData,
} from '../../../shared/index';


@Injectable({
  providedIn: 'root',
})
export class StreamService {
  private url = `${environment.baseUrl}streams`;

  public constructor(private http: HttpClient) {}

  public getStreams(
    page: number = 1,
    limit: number = 5
  ): Observable<Pagination<Stream>> {
    return this.http.get<Pagination<Stream>>(
      `${this.url}?page=${page}&limit=${limit}`
    );
  }

  public getStream(id: number): Observable<Stream> {
    return this.http.get<Stream>(`${this.url}/${id}`);
  }

  public updateStream(id: number, data: any): Observable<ResponseData<string>> {
    return this.http.put<ResponseData<string>>(`${this.url}/${id}`, data);
  }

  public addStream(data: any): Observable<ResponseData<string>> {
    return this.http.post<ResponseData<string>>(`${this.url}`, data);
  }

  public changeStatus(
    id: number,
    status: boolean
  ): Observable<ResponseData<string>> {
    let data = {
      status: status,
    };
    return this.http.post<ResponseData<string>>(
      `${this.url}/change-status/${id}`,
      data
    );
  }

  public activeData(): Observable<DropdownOption[]> {
    return this.http.get<DropdownOption[]>(`${this.url}/active`);
  }

  public getStreamByCourse(id: number): Observable<DropdownOption[]> {
    return this.http.get<DropdownOption[]>(`${this.url}/course-id/${id}`);
  }
}
