import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BloodGroup } from '../index';
import {
  ResponseData,
  DropdownOption,
  Pagination,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class BloodGroupService {
  private url = `${environment.baseUrl}blood-groups`;

  public constructor(private http: HttpClient) {}

  public getBloodGroups(
    page: number = 1,
    limit: number = 5
  ): Observable<Pagination<BloodGroup>> {
    return this.http.get<Pagination<BloodGroup>>(
      `${this.url}/?page=${page}&limit=${limit}`
    );
  }
  public getBloodGroup(id: number): Observable<BloodGroup> {
    return this.http.get<BloodGroup>(`${this.url}/${id}/`);
  }

  public updateBloodGroup(
    id: number,
    data: any
  ): Observable<ResponseData<string>> {
    return this.http.put<ResponseData<string>>(`${this.url}/${id}/`, data);
  }

  public addBloodGroup(data: any): Observable<ResponseData<string>> {
    return this.http.post<ResponseData<string>>(`${this.url}/`, data);
  }

  public changeStatus(
    id: number,
    status: boolean
  ): Observable<ResponseData<string>> {
    let data = {
      status: status,
    };
    return this.http.post<ResponseData<string>>(
      // `${this.url}/change-status/${id}/`,
      `${this.url}/${id}/change-status/`,
      // `${this.url}/${id}/`,
      data
    );
  }

  public activeData(): Observable<DropdownOption[]> {
    return this.http.get<DropdownOption[]>(`${this.url}/?limit=999999999999`);
  }
}
