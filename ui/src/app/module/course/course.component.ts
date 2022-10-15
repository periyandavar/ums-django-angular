import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course, CourseService } from './index';
import { ToastService } from '../../shared/index';
import { AppState } from 'src/app/store';
import { courseActions } from './store';
import { Subscription } from 'rxjs';
import { getCourses, getTcount } from './store/course.selector';
import { setLoadingSpinner } from '../../shared/store/shared.action';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, OnDestroy {
  // public courses: Course[] = [];
  public courses$ = this.store.select(getCourses);
  public totalRecords: number = 0;
  public page: number = 1;
  public itemsPerPage = 5;
  private subscription?:Subscription;
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

  public getPage(page: number) {
    // this.courseService.getCourses(page).subscribe(
    //   (result) => {
    //     this.courses = result.data;
    //     this.totalRecords = result.tcount;
    //   },
    //   (error) => {
    //     this.toastService.showToast(
    //       'Unable to get the data.. please, try again later..!'
    //     );
    //     console.log(error.status);
    //   }
    // );
    this.store.dispatch(setLoadingSpinner({status:true}));

    this.store.dispatch(courseActions.loadCourses({page:page}));
  }

  public changeStatus(id: number, status: boolean) {
    // this.courseService.changeStatus(id, status).subscribe(
    //   () => {
    //     location.reload();
    //   },
    //   (error) => {
    //     this.toastService.showToast(
    //       'something went wrong.. please, try again later..!'
    //     );
    //     console.log(error.status);
    //   }
    // );
    this.store.dispatch(setLoadingSpinner({status:true}));

    this.store.dispatch(courseActions.changeCourseStatus({id: id, status: status}))
  }
}
