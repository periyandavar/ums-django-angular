import { Store } from '@ngrx/store';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from '../../../stream/index';
import { CourseService } from '../../index';
import {
  courseForm,
  ToastService,
  DropdownOption,
} from '../../../../shared/index';
import { AppState } from 'src/app/store';
import { courseActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-new-course',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">New Course Value</h4>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-12 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-heading"></div>
              <form method="post" (ngSubmit)="submit()" [formGroup]="formGroup">
                <div *ngFor="let error of errorMsgs" class="alert alert-danger">
                  {{ error }}
                </div>
                <div id="course">
                  <div class="form-group">
                    <label for="course_value" class="required"
                      >Course Name</label
                    ><input
                      type="text"
                      formControlName="value"
                      id="course_value"
                      required="required"
                      maxlength="12"
                      pattern="^[A-Za-z ]+$"
                      class="form-control"
                    />
                    <div
                      *ngIf="
                        formGroup.get('value')?.invalid &&
                        (formGroup.get('value')?.dirty ||
                          formGroup.get('value')?.touched)
                      "
                      class="alert alert-danger"
                    >
                      <div *ngIf="formGroup.get('value')?.errors?.required">
                        Value is required.
                      </div>
                      <div *ngIf="formGroup.get('value')?.errors?.pattern">
                        Please enter the valid course name.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="required" for="education_course_streams"
                    >Streams</label
                  >
                  <ng-select
                    [multiple]="true"
                    formControlName="streams"
                    id="education_course_streams"
                    name="education_course[streams][]"
                    required="required"
                    class="select2-control form-control"
                  >
                    <ng-option
                      *ngFor="let stream of streams"
                      [value]="stream.id"
                      >{{ stream.value }}</ng-option
                    >
                  </ng-select>
                  <div
                    *ngIf="
                      formGroup.get('streams')?.invalid &&
                      (formGroup.get('streams')?.dirty ||
                        formGroup.get('streams')?.touched)
                    "
                    class="alert alert-danger"
                  >
                    <div *ngIf="formGroup.get('streams')?.errors?.required">
                      Value is required.
                    </div>
                  </div>
                </div>
                <button [disabled]="formGroup.invalid" class="btn bg-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NewCourseComponent implements OnInit {
  public formGroup = this.fb.group(courseForm);

  public streams?: DropdownOption[];
  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private injector: Injector,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.injector
      .get(StreamService)
      .activeData()
      .subscribe(
        (data) => {
          this.streams = data;
        },
        () => {
          this.toastService.showToast('Unable to load the streams');
        }
      );
  }

  public submit() {
    if (this.formGroup.valid) {
      // this.courseService.addCourse(this.formGroup.value).subscribe(
      //   (result) => {
      //     if (!result.error) {
      //       this.toastService.showToast(result.result);
      //       this.router.navigate(['../'], { relativeTo: this.route });
      //     } else {
      //       this.errorMsgs = (result.result as any).form.children.value.errors;
      //     }
      //   },
      //   (err) => {
      //     console.error(err);
      //     this.toastService.showToast(
      //       'Something went wrong.. please, try again later..!'
      //     );
      //   }
      // );
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(courseActions.addCourse({data:this.formGroup.value}));
    }
  }
}
