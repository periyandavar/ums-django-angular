import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserActions } from '.';
import { UserService } from '../service/user.service';
import { Update } from '@ngrx/entity';
import { User } from '../model/user';
import { of } from 'rxjs';
import { ToastService } from '../../../shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { setLoadingSpinner } from '../../../shared/store/shared.action';
import { AppState } from 'src/app/store';
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap((data) =>
        this.userService.getUsers(data.page).pipe(
          map((users) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            console.log("klkklklkl");
            console.log(users.results)
            return UserActions.loadUsersSuccess({ user: users });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(UserActions.loadUsersFailure({ error: error }));
          })
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) => {
        return this.userService.newUser(action.data).pipe(
          map((data: any) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            if (data.id) {
              this.toastService.showToast('Success..!');
              this.router.navigate(['../../../users'], {
                relativeTo: this.route,
              });
              const user = { ...action.data, id: data.id };
              return UserActions.addUserSuccess({
                id: data.id,
                data: user,
              });
            }
            throw new Error('');
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(UserActions.loadUsersFailure({ error: error }));
          })
        );
      })
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.userService.updateUser(action.id, action.data).pipe(
          map(() => {
            const updatedUser: Update<User> = {
              id: parseInt(action.data.id as any, 10),
              changes: {
                ...action.data,
              },
            };
            this.toastService.showToast('success..!');
            this.router.navigate(['../../../users'], {
              relativeTo: this.route,
            });
            return UserActions.updateUserSuccess({ update: updatedUser });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(UserActions.loadUsersFailure({ error: error }));
          })
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.changeUserStatus),
      mergeMap((action) => {
        return this.userService.deleteUser(action.id).pipe(
          map(() => {
            //   const updatedUser: Update<User> = {
            //     id: parseInt(action.id as any, 10),
            //     changes: {
            //       ...action.data,
            //     },
            //   };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return UserActions.deleteUserSuccess({
              // update: updatedUser,
              id: action.id,
            });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(UserActions.loadUsersFailure({ error: error }));
          })
        );
      })
    );
  });
}
