import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../index';
import { ToastService } from '../../../../shared/index';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { getCurrentRoute } from '../../../../store/router/router.selector';
import { UserActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public toast: ToastService,
    private store: Store<AppState>
  ) {}

  public errors: any;

  public user: User | null = null;

  public ngOnInit(): void {
    // this.route.paramMap.subscribe(
    //   (params) => {
      this.store.select(getCurrentRoute).subscribe((data) => {
        this.userService
          .getUser(parseInt(data.params['id'] as any, 10))
          .subscribe((user) => {
            this.user = user;
          });
      },
      () => {
        this.toast.showToast(
          'Unable to fetch the data.. please, try again later..!'
        );
      }
    );
  }

  public addUser(data: User) {
    if (this.user) {
      this.store.dispatch(setLoadingSpinner({status:true}));

      this.store.dispatch(UserActions.updateUser({id:this.user.id, data:data}));
      // this.userService.updateUser(data, this.user.id).subscribe(
      //   (result) => {
      //     if (!result.error) {
      //       this.toast.showToast(result.result);
      //       this.router.navigate(['../../', this.user?.id], {
      //         relativeTo: this.route,
      //       });
      //     } else {
      //       this.errors = result.result as any;
      //     }
      //   },
      //   () => {
      //     this.toast.showToast(
      //       'something went wrong..! please try again later'
      //     );
      //   }
      // );
    }
  }
}
