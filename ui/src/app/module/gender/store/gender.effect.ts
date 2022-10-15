import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { genderActions } from './';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';
import { ToastService } from '../../../shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenderService } from '../service/gender.service';
import { AppState } from 'src/app/store';
import { setLoadingSpinner } from '../../../shared/store/shared.action';
@Injectable()
export class GenderEffects {
  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private genderService: GenderService,
    private store:Store<AppState>
  ) {}

  actionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(genderActions.actionSuccess),
      tap(() =>{
         this.toastService.showToast("Success..!");
         this.router.navigate(["../../genders"], {relativeTo: this.route});
      }
      ),
    );
  }   , { dispatch: false }
  );

  changeGenderStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(genderActions.changeGenderStatus),
      mergeMap((action) => {
        return this.genderService.changeStatus(action.id, action.status).pipe(
          map(() => {
            //   const updatedCourse: Update<Course> = {
            //     id: parseInt(action.id as any, 10),
            //     changes: {
            //       ...action.data,
            //     },
            //   };
            this.store.dispatch(setLoadingSpinner({status:false}));
            location.reload();
            return genderActions.changeGenderStatusSuccess({
              id: action.id,
              status: action.status,
            });
          }),
          catchError((error) =>
            of(genderActions.actionFailed())
          )
        );
      })
    );
  });

  actionFailed$ = createEffect(()=> this.actions$.pipe(
      ofType(genderActions.actionFailed), 
      tap(()=> this.toastService.showToast("An error occured please try again"))));

  }
