import { getPage } from './../../../store/app.select';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Gender } from '../model/gender';
import { map, tap, catchError } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { DropdownOption, Pagination } from '../../../shared/';
import { ResponseData } from '../../../shared/model/response-data';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { setTcount } from '../../../store/app.action';
import { genderActions } from '../store';
import { setLoadingSpinner } from '../../../shared/store/shared.action';


@Injectable({
  providedIn: 'root'
})
export class GenderDataService extends DefaultDataService<Gender> {

  private _url = environment.baseUrl + 'genders';

  private page: number = 1;

  constructor(http: HttpClient, urlGenerator: HttpUrlGenerator, private store:Store<AppState>) {
    super('Gender', http, urlGenerator);
    this.store.select(getPage).subscribe(
      (page) => {
        console.log(page);
        this.page = page}
      );
  }

  public getAll(): Observable<Gender[]> {
    return this.http.get<Pagination<Gender>>(
      `${this._url}/?page=${this.page}&limit=5`
    ).pipe(
      map((data) => {
        this.store.dispatch(setTcount({tcount:data.count}));
        this.store.dispatch(setLoadingSpinner({status:false}));
        return data.results})
    );
  }

  public getGender(id: number): Observable<Gender> {
    return this.http.get<Gender>(`${this._url}/${id}/`).pipe(
      tap(()=> {
        this.store.dispatch(setLoadingSpinner({status:false}));
      })
    );
  }

  public update(gender: Update<Gender>): Observable<Gender> {
    console.log(gender);
    console.log(gender.changes.value);
    const data = gender.changes.value;
    return this.http.put<Gender>(`${this._url}/${gender.id}/`, {value:data}).pipe(
      tap(() => {
        this.store.dispatch(genderActions.actionSuccess());
        this.store.dispatch(setLoadingSpinner({status:false}));
      })
    );
  }

  public add(gender: Gender):Observable<Gender> {
    return this.http.post<{id: number}>(`${this._url}/`, {value: gender.value}).pipe(
      map((data) => {
        this.store.dispatch(genderActions.actionSuccess());
        this.store.dispatch(setLoadingSpinner({status:false}));
        return { ...gender, id: data.id };
      })
    );
  }

  public changeStatus(
    id: number,
    status: boolean
  ): Observable<ResponseData<string>> {
    let data = {
      status: status,
    };
    return this.http.post<ResponseData<string>>(
      `${this._url}/change-status/${id}/`,
      data
    ).pipe(
      tap(()=> {
        this.store.dispatch(setLoadingSpinner({status:false}));
      })
    );
  }

  // public update(gender: Update<Gender>): Observable<Gender> {
  //   return this.http.put<Gender>(`${this._url}/${gender.id}`, { ...gender.changes });
  // }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this._url}/${id}/`).pipe(
      map(() => {
        this.store.dispatch(setLoadingSpinner({status:false}));
        return id.toString();
      })
    );
  }

  public activeData(): Observable<DropdownOption[]> {
    return this.http.get<DropdownOption[]>(`${this._url}/active/`);
  }
}
