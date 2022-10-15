import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { courseActions } from '.';
import { CourseService } from '../service/course.service';
import { Update } from '@ngrx/entity';
import { Course } from '../model/course';
import { of } from 'rxjs';
import { ToastService } from '../../../shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store';
import { setLoadingSpinner } from '../../../shared/store/shared.action';
@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.loadCourses),
      mergeMap((data) =>
        this.courseService.getCourses(data.page).pipe(
          map((courses) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return courseActions.loadCoursesSuccess({ course: courses });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(courseActions.loadCoursesFailure({ error: error }));
          })
        )
      )
    );
  });

  fectchById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.loadCourseById),
      mergeMap((action) => {
        console.log(action);
        return this.courseService.getCourse(action.id).pipe(
          map((data:any) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            return courseActions.loadCourseByIdSuccess({course: data})
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({status:false}));
            return of(courseActions.loadCourseByIdFailure({error:error}));
          })
        )
      })
    )
  })

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.addCourse),
      mergeMap((action) => {
        return this.courseService.addCourse(action.data).pipe(
          map((data: any) => {
            if (data.id) {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.toastService.showToast('Success..!');
              this.router.navigate(['../../../courses'], {
                relativeTo: this.route,
              });
              const course = { ...action.data, id: data.id };
              return courseActions.addCourseSuccess({
                id: data.id,
                data: course,
              });
            }
            throw new Error('');
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(courseActions.loadCoursesFailure({ error: error }));
          })
        );
      })
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.updateCourse),
      mergeMap((action) => {
        return this.courseService.updateCourse(action.id, action.data).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const updatedCourse: Update<Course> = {
              id: parseInt(action.data.id as any, 10),
              changes: {
                ...action.data,
              },
            };
            this.toastService.showToast('success..!');
            this.router.navigate(['../../../courses'], {
              relativeTo: this.route,
            });
            return courseActions.updateCourseSuccess({ update: updatedCourse });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(courseActions.loadCoursesFailure({ error: error }));
          })
        );
      })
    );
  });

  changeCourseStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(courseActions.changeCourseStatus),
      mergeMap((action) => {
        return this.courseService.changeStatus(action.id, action.status).pipe(
          map(() => {
            //   const updatedCourse: Update<Course> = {
            //     id: parseInt(action.id as any, 10),
            //     changes: {
            //       ...action.data,
            //     },
            //   };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return courseActions.changeCourseStatusSuccess({
              // update: updatedCourse,
              id: action.id,
              status: action.status,
            });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(courseActions.loadCoursesFailure({ error: error }));
          })
        );
      })
    );
  });
}
