import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Stream } from './model/stream';
import { StreamService } from './service/stream.service';
import { ToastService } from '../../shared/service/toast.service';
import { AppState } from 'src/app/store';
import { getStreams, getTcount } from './store/stream.selector';
import { StreamActions } from './store';
import { Subscription } from 'rxjs';
import { setLoadingSpinner } from '../../shared/store/shared.action';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
})
export class StreamComponent implements OnInit {
  public streams$ = this.store.select(getStreams);
  public totalRecords: number = 0;
  public page: number = 1;
  public itemsPerPage = 5;
  private subscription!: Subscription;

  public constructor(
    private store: Store<AppState>
    
  ) {}

  public ngOnInit(): void {
    this.subscription = this.store.select(getTcount).subscribe(
      (data) => {this.totalRecords = data}
    )
    this.getPage(1);
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  public changeStatus(id: number, status: boolean) {
    // this.streamService.changeStatus(id, status).subscribe(
    //   () => {
    //     location.reload();
    //   },
    //   (error) => {
    //     console.log(error.status);
    //     this.toastService.showToast(
    //       'Something went wrong.. please, try again later..!'
    //     );
    //   }
    // );
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(StreamActions.changeStreamStatus({id: id, status: status}))
  }

  public getPage(page: number) {
    // this.streamService.getStreams(page).subscribe(
    //   (streams) => {
    //     this.streams = streams.data;
    //     this.totalRecords = streams.tcount;
    //   },
    //   (error) => {
    //     this.toastService.showToast(
    //       'Unable to fetch the data.. please, try again later..!'
    //     );
    //     console.log(error.status);
    //   }
    // );
    this.store.dispatch(setLoadingSpinner({status:true}));

    this.store.dispatch(StreamActions.loadStreams({page:page}));
  }
}
