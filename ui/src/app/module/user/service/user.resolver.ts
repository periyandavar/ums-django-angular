import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, User } from '../index';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  public constructor(private userService: UserService, private store: Store<AppState>) {}
  // this.userService.getUser(data.params['id'] as any)

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // return this.store.select(getCurrentRoute).pipe(
    //   map((data)=> {
    //     this.userService.getUser(data.params['id']).subscribe((result) => {
    //      let user = result;
    //     })
    //     return user;
    //   }),
    //   first()
    // )
    // return this.store.select(getCurrentRoute).pipe(
    //   switchMap((route) => {
    //   return this.userService.getUser(route.params["id"] as any)
    // }))
    return this.userService.getUser(route.paramMap.get('id') as any);
  }
}
