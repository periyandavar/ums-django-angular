import { Profile } from './../model/profile';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { ResponseData } from '../../../shared/model/response-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = environment.baseUrl;

  public constructor(private http: HttpClient) {}

  public changePass(formData: Profile): Observable<ResponseData<any>> {
    const data = {
        old_password: formData.password,
        new_password: formData.confirmPassword,
    };
    return this.http.put<ResponseData<any>>(
      `${this.url}users/change-password/`,
      data
    );
  }
}
