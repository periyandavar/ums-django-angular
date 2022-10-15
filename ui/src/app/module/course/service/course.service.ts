import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../index';
import {
  ResponseData,
  DropdownOption,
  Pagination,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = `${environment.baseUrl}courses`;

  public constructor(private http: HttpClient) {}

  public getCourses(
    page: number = 1,
    limit: number = 5
  ): Observable<Pagination<Course>> {
    return this.http.get<Pagination<Course>>(
      `${this.url}?page=${page}&limit=${limit}`
    );
  }

  public getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  public updateCourse(id: number, data: any): Observable<ResponseData<string>> {
    return this.http.put<ResponseData<string>>(`${this.url}/${id}`, data);
  }

  public addCourse(data: any): Observable<ResponseData<string>> {
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
}
