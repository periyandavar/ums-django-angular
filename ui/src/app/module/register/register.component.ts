import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegisterFormErrors } from './index';
import { ToastService, checkPasswords, LoginService } from '../../shared/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public errors: RegisterFormErrors = {
    username: [],
    password: [],
  };

  public registerFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: this.fb.group(
      {
        first: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        second: ['', [Validators.required]],
      },
      { validators: checkPasswords }
    ),
  });

  public constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {}

  public register() {
    if (this.registerFormGroup.valid) {
      this.loginService.registerUser(this.registerFormGroup.value).subscribe(
        (result) => {
          if (!result.error) {
            this.toastService.showToast(
              'Your account is created successfully..! Now, you can login with your credentials.'
            );
            this.router.navigate(['/login'], { relativeTo: this.route });
          } else if (result.result.form.children) {
            this.errors.username =
              result?.result?.form?.children?.username?.errors;
            this.errors.password.push(
              result?.result?.form?.children?.password?.children?.first
            );
            this.errors.password.push(
              result?.result?.form?.children?.password?.children?.second
            );
          } else {
            this.toastService.showToast(
              'Something went wrong please try again..!'
            );
          }
        },
        () => {
          this.toastService.showToast('Registration failed..!');
        }
      );
    }
  }
}
