import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastService, simpleForm } from '../../../../shared';
import { BloodGroupService, BloodGroup } from '../../';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { getCurrentRoute } from '../../../../store/router';
import { bloodGroupActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store';

@Component({
  selector: 'app-edit-blood-group',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">Edit Blood Group Value</h4>
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
                <div id="bloodGroup">
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
export class EditBloodGroupComponent implements OnInit {
  public formGroup = this.fb.group(simpleForm);
  public errorMsgs?: string[];

  private bloodGroup?: BloodGroup;

  public constructor(
    private fb: FormBuilder,
    private bloodGroupService: BloodGroupService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.store.select(getCurrentRoute).subscribe((data) => {
      this.bloodGroupService
        .getBloodGroup(parseInt(data.params['id'], 10))
        .subscribe(
          (bloodGroup) => {
            this.bloodGroup = bloodGroup;
            this.formGroup.patchValue({
              value: bloodGroup.value,
            });
          },
          () => {
            this.toastService.showToast(
              'Unable to fetch data.. please try again later..!'
            );
          }
        );
    });
  }

  public submit() {
    if (this.bloodGroup && this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(
        bloodGroupActions.updateBloodGroup({
          id: this.bloodGroup.id,
          data: this.formGroup.value,
        })
      );
    }
  }
}
