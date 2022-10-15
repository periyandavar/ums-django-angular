import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/index';
import { ToastService } from '../../shared/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {}

  public login() {
    if (this.loginFormGroup.valid) {
      this.loginService.loginUser(this.loginFormGroup.value).subscribe(
        (result) => {
          if (result.status) {
            this.loginService.registerToken(result.data.token);
            this.router.navigate(['/users'], { relativeTo: this.route });
          } else {
            this.toastService.showToast('Login failed..! Invalid credentials');  
          }
          
        },
        (err) => {
          this.toastService.showToast('Login failed..! Invalid credentials');
        }
      );
    }
  }
}
