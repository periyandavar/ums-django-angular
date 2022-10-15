import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender, GenderService } from '../../index';
import { simpleForm, ToastService } from '../../../../shared/index';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/';
import { getCurrentRoute } from '../../../../store/router/';
import { GenderDataService } from '../../service/gender-data.service';
import { GenderEntityService } from '../../service/gender-entity.service';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-edit-gender',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">Edit Gender Value</h4>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-12 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-heading"></div>
              <form
                method="post"
                (ngSubmit)="submit()"
                [formGroup]="genderFormGroup"
              >
                <div *ngFor="let error of errorMsgs" class="alert alert-danger">
                  {{ error }}
                </div>
                <div id="gender">
                  <div class="form-group">
                    <label for="gender_value" class="required">Value</label
                    ><input
                      type="text"
                      formControlName="value"
                      id="gender_value"
                      required="required"
                      maxlength="12"
                      pattern="[a-zA-Z ]+"
                      class="form-control"
                    />
                    <div
                      *ngIf="
                        genderFormGroup.get('value')?.invalid &&
                        (genderFormGroup.get('value')?.dirty ||
                          genderFormGroup.get('value')?.touched)
                      "
                      class="alert alert-danger"
                    >
                      <div
                        *ngIf="genderFormGroup.get('value')?.errors?.required"
                      >
                        Value is required.
                      </div>
                      <div
                        *ngIf="genderFormGroup.get('value')?.errors?.pattern"
                      >
                        Please enter the valid name.
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  [disabled]="genderFormGroup.invalid"
                  class="btn bg-primary"
                >
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
export class EditGenderComponent implements OnInit {
  public genderFormGroup = this.fb.group(simpleForm);

  private gender?: Gender;

  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private store: Store<AppState>,
    private genderEntityService: GenderEntityService
  ) {}

  public ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
      this.store.select(getCurrentRoute).subscribe((data) => {
      this.genderService
        .getGender(parseInt(data.params['id'] as any, 10))
        .subscribe((gender) => {
          this.gender = gender;
          this.genderFormGroup.patchValue({
            value: gender.value,
          });
        });
    });
  }

  public submit() {
    if (this.gender && this.genderFormGroup.valid) {
      // const gender: Gender = {
      //   value: this.genderFormGroup.value
      // }
      const gender = {
          id: this.gender.id,
          value: this.genderFormGroup.value.value,
      };
      console.log(gender);
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.genderEntityService.update(gender);

      // this.genderService
      //   .updateGender(this.gender.id, this.genderFormGroup.value)
      //   .subscribe(
      //     (result) => {
      //       if (!result.error) {
      //         this.toastService.showToast(result.result);
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
