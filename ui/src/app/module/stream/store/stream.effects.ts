import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { StreamActions } from '.';
import { StreamService } from '../service/stream.service';
import { Update } from '@ngrx/entity';
import { Stream } from '../model/stream';
import { of } from 'rxjs';
import { ToastService } from '../../../shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store';
import { setLoadingSpinner } from '../../../shared/store/shared.action';
@Injectable()
export class StreamEffects {
  constructor(
    private actions$: Actions,
    private streamService: StreamService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  loadStreams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StreamActions.loadStreams),
      mergeMap((data) =>
        this.streamService.getStreams(data.page).pipe(
          map((streams) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return StreamActions.loadStreamsSuccess({ stream: streams });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(StreamActions.loadStreamsFailure({ error: error }));
          })
        )
      )
    );
  });

  addStream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StreamActions.addStream),
      mergeMap((action) => {
        return this.streamService.addStream(action.data).pipe(
          map((data: any) => {
            if (data.id) {
              this.toastService.showToast('Success..!');
              this.router.navigate(['../../../streams'], {
                relativeTo: this.route,
              });
              const stream = { ...action.data, id: data.id };
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return StreamActions.addStreamSuccess({
                id: data.id,
                data: stream,
              });
            }
            this.store.dispatch(setLoadingSpinner({ status: false }));
            throw new Error('');
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(StreamActions.loadStreamsFailure({ error: error }));
          })
        );
      })
    );
  });

  updateStream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StreamActions.updateStream),
      mergeMap((action) => {
        return this.streamService.updateStream(action.id, action.data).pipe(
          map(() => {
            const updatedStream: Update<Stream> = {
              id: parseInt(action.data.id as any, 10),
              changes: {
                ...action.data,
              },
            };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.toastService.showToast('success..!');
            this.router.navigate(['../../../streams'], {
              relativeTo: this.route,
            });
            return StreamActions.updateStreamSuccess({ update: updatedStream });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(StreamActions.loadStreamsFailure({ error: error }));
          })
        );
      })
    );
  });

  changeStreamStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StreamActions.changeStreamStatus),
      mergeMap((action) => {
        return this.streamService.changeStatus(action.id, action.status).pipe(
          map(() => {
            //   const updatedStream: Update<Stream> = {
            //     id: parseInt(action.id as any, 10),
            //     changes: {
            //       ...action.data,
            //     },
            //   };
            this.store.dispatch(setLoadingSpinner({status:false}));
            return StreamActions.changeStreamStatusSuccess({
              // update: updatedStream,
              id: action.id,
              status: action.status,
            });
          }),
          catchError((error) =>
            {this.store.dispatch(setLoadingSpinner({status:false})); return of(StreamActions.loadStreamsFailure({ error: error }))}
          )
        );
      })
    );
  });
}
