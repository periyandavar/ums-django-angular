import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { simpleForm, ToastService } from '../../../../shared/index';
import { GenderService } from '../../index';
import { GenderEntityService } from '../../service/gender-entity.service';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-new-gender',
  template: `
    <div class="content-wrapper mt-md-5 p-3">
      <div class="container bg-info p-4 rounded">
        <div class="row pad-botm login-container">
          <div class="col-md-12">
            <h4 class="header-line">New Gender Value</h4>
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
                        Please enter the valid course name.
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  [disabled]="genderFormGroup.invalid"
                  class="btn bg-primary"
                >
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
export class NewGenderComponent implements OnInit {
  public genderFormGroup = this.fb.group(simpleForm);
  public errorMsgs?: string[];

  public constructor(
    private fb: FormBuilder,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private genderEntityService: GenderEntityService,
    private store:Store<AppState>
  ) {}

  public ngOnInit(): void {}

  public submit() {
    if (this.genderFormGroup.valid) {
      // this.genderService.addGender(this.genderFormGroup.value).subscribe(
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
      //       'something went wrong.. please, try again later..'
      //     );
      //   }
      // );

      const gender = {
        value: this.genderFormGroup.value.value,
        status: true
    };
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.genderEntityService.add(gender);

    }
  }
}
