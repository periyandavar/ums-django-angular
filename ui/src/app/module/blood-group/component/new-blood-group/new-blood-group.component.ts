import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { simpleForm } from '../../../../shared';
import { AppState } from 'src/app/store';
import { bloodGroupActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store';

@Component({
  selector: 'app-new-blood-group',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">New Blood Group Value</h4>
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
                <div id="blood_group">
                  <div class="form-group">
                    <label for="blood_group_value" class="required">Value</label
                    ><input
                      type="text"
                      formControlName="value"
                      id="blood_group_value"
                      required="required"
                      class="form-control"
                      pattern="^(A|B|AB|O)[+-]"
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
                        Please enter the valid blood group
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
export class NewBloodGroupComponent implements OnInit {
  public formGroup = this.fb.group(simpleForm);

  public errorMsgs?: string[];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  public ngOnInit(): void {}

  public submit() {
    if (this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(
        bloodGroupActions.addBloodGroup({ data: this.formGroup.value })
      );
    }
  }
}
