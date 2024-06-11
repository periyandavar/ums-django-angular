import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StreamService } from '../../../stream/index';
import { CourseService, Course } from '../../index';
import {
  DropdownOption,
  courseForm,
  ToastService,
} from '../../../../shared/index';
import { AppState } from 'src/app/store/';
import { Store } from '@ngrx/store';
import { getCurrentRoute } from '../../../../store/router/';
import { courseActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { getCurrentCourse } from '../../store/course.selector';

@Component({
  selector: 'app-edit-course',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">Edit Course Value</h4>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-12 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-heading"></div>
              <form method="post" (ngSubmit)="submit()" [formGroup]="formGroup">
                <div id="course">
                  <div class="form-group">
                    <div
                      *ngFor="let error of errorMsgs"
                      class="alert alert-danger"
                    >
                      {{ error }}
                    </div>
                    <label for="course_value" class="required"
                      >Course Name</label
                    ><input
                      type="text"
                      formControlName="value"
                      id="course_value"
                      required="required"
                      maxlength="12"
                      pattern="[a-zA-Z ]+"
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
                    formControlName="streams"
                    [multiple]="true"
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
                      formGroup.get('value')?.invalid &&
                      (formGroup.get('value')?.dirty ||
                        formGroup.get('value')?.touched)
                    "
                    class="alert alert-danger"
                  >
                    <div *ngIf="formGroup.get('value')?.errors?.required">
                      Value is required.
                    </div>
                  </div>
                </div>
                <button [disabled]="formGroup.invalid" class="btn bg-primary">
                  Update
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
export class EditCourseComponent implements OnInit {
  public formGroup = this.fb.group(courseForm);

  public streams?: DropdownOption[];

  private course?: Course;
  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private injector: Injector,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {

    this.store.select(getCurrentCourse).subscribe((course)=> {
      if (course) {
        let streams: number[] = [];
        for (const stream of course.streams) {
          streams.push(stream.id)
        }
        this.course = course;
        this.formGroup.patchValue({
          value: course.value,
          streams: streams
        })
      } else {
        this.store.select(getCurrentRoute).subscribe((route) => {
          console.log(route.params["id"]);
          this.store.dispatch(courseActions.loadCourseById(route.params["id"]));
        })
      }
    });

    this.injector
      .get(StreamService)
      .activeData()
      .subscribe(
        (data) => {
          this.streams = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public submit() {
    if (this.course && this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(courseActions.updateCourse({data:this.formGroup.value, id:this.course.id}));
    }
  }
}
