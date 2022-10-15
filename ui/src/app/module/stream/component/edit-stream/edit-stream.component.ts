import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { simpleForm, ToastService } from '../../../../shared/index';
import { Stream, StreamService } from '../../index';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/';
import { getCurrentRoute } from '../../../../store/router/';
import { StreamActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-edit-stream',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">Edit Stream Value</h4>
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
                <div id="stream">
                  <div class="form-group">
                    <label for="stream_value" class="required">Value</label
                    ><input
                      type="text"
                      formControlName="value"
                      id="stream_value"
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
export class EditStreamComponent implements OnInit {
  public formGroup = this.fb.group(simpleForm);

  private stream?: Stream;
  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private store:Store<AppState>
  ) {}

  public ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    this.store.select(getCurrentRoute).subscribe((data) => {
      this.streamService
        .getStream(parseInt(data.params['id'] as any, 10))
        .subscribe(
          (stream) => {
            this.stream = stream;
            this.formGroup.patchValue({
              value: stream.value,
            });
          },
        );
    });
  }

  public submit() {
    if (this.stream && this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(StreamActions.updateStream({data:this.formGroup.value, id:this.stream.id}));
      // this.streamService
      //   .updateStream(this.stream.id, this.formGroup.value)
      //   .subscribe(
      //     (result) => {
      //       this.toastService.showToast(result.result);
      //       if (!result.error) {
      //         this.router.navigate(['../../'], { relativeTo: this.route });
      //       } else {
      //         this.errorMsgs = (
      //           result.result as any
      //         ).form.children.value.errors;
      //       }
      //     },
      //     () => {
      //       this.toastService.showToast(
      //         'something went wrong.. please, try again later..!'
      //       );
      //     }
      //   );
    }
  }
}
