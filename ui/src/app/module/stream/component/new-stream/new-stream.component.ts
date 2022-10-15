import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store';
import { simpleForm, ToastService } from '../../../../shared/index';
import { StreamService } from '../../index';
import { StreamActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-new-stream',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">New Stream Value</h4>
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
export class NewStreamComponent implements OnInit {
  public formGroup = this.fb.group(simpleForm);
  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {}

  public submit() {
    if (this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(StreamActions.addStream({data:this.formGroup.value}));

      // this.streamService.addStream(this.formGroup.value).subscribe(
      //   (result) => {
      //     if (!result.error) {
      //       this.toastService.showToast(result.result);
      //       this.router.navigate(['../'], { relativeTo: this.route });
      //     } else {
      //       this.errorMsgs = (result.result as any).form.children.value.errors;
      //     }
      //   },
      //   () => {
      //     this.toastService.showToast(
      //       'Something went wrong.. please, try again later..!'
      //     );
      //   }
      // );
    }
  }
}
