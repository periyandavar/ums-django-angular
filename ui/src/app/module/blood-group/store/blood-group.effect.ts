import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { BloodGroupService } from '../';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { bloodGroupActions } from '.';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store';
import { setLoadingSpinner } from '../../../shared/store';
@Injectable()
export class BloodGroupEffects {
  constructor(
    private actions$: Actions,
    private bloodGroupService: BloodGroupService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  public loadBloodGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bloodGroupActions.loadBloodGroups),
      mergeMap((state) => {
        return this.bloodGroupService.getBloodGroups(state.page).pipe(
          map((bloodGroup) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return bloodGroupActions.loadBloodGroupsSuccess({
              bloodGroup: bloodGroup,
            });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(
              bloodGroupActions.loadBloodGroupsFailure({ error: error })
            );
          })
        );
      })
    );
  });

  public updateBloodGroupStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bloodGroupActions.changeBloodGroupStatus),
      mergeMap((state) => {
        return this.bloodGroupService.changeStatus(state.id, state.status).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return bloodGroupActions.changeBloodGroupStatusSuccess({
              id: state.id,
              status: state.status,
            });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(
              bloodGroupActions.changeBloodGroupStatusFailure({ error: error })
            );
          })
        );
      })
    );
  });

  public updateBloodGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bloodGroupActions.updateBloodGroup),
      mergeMap((state) => {
        return this.bloodGroupService
          .updateBloodGroup(state.id, state.data)
          .pipe(
            map(() => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.toastService.showToast('Successs..!');
              this.router.navigate(['../../../blood-groups'], {
                relativeTo: this.route,
              });
              return bloodGroupActions.updateBloodGroupSuccess({
                id: state.id,
                data: state.data,
              });
            }),
            catchError((error) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return of(
                bloodGroupActions.updateBloodGroupFailure({ error: error })
              );
            })
          );
      })
    );
  });

  public addBlooodGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bloodGroupActions.addBloodGroup),
      mergeMap((state) => {
        return this.bloodGroupService.addBloodGroup(state.data).pipe(
          map((data) => {
            if (data.id) {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.toastService.showToast('Success..!');
              this.router.navigate(['../../../blood-groups'], {
                relativeTo: this.route,
              });
              return bloodGroupActions.addBloodGroupSuccess({
                id: data.id,
                data: state.data,
              });
            }
            throw new Error('');
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(
              bloodGroupActions.updateBloodGroupFailure({ error: error })
            );
          })
        );
      })
    );
  });
}
