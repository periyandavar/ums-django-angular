import { Profile } from './model/profile';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public constructor(
    private toastService: ToastService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public model = new Profile('', '');

  public errorMsgs?: string[];

  public ngOnInit(): void {}

  public submit() {
    this.profileService.changePass(this.model).subscribe(
      (result) => {
        if (!result.error) {
          console.log(result)
          this.toastService.showToast((result as any).message);
          this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          this.errorMsgs = (result.result as any).form.children.value.errors;
        }
      },
      () => {
        this.toastService.showToast(
          'Something went wrong.. please, try again later'
        );
      }
    );
  }
}
