import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store';
import { ToastService } from '../../../../shared/index';
import { User, UserService } from '../../index';
import { UserActions } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  public errors: any;

  public constructor(
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {}

  public addUser(data: User) {
    this.store.dispatch(setLoadingSpinner({status:true}));

    this.store.dispatch(UserActions.addUser({data:data}));
    // this.userService.newUser(data).subscribe(
    //   (result) => {
    //     if (!result.error) {
    //       this.toast.showToast(result.result);
    //       this.router.navigate(['../'], { relativeTo: this.route });
    //     } else {
    //       this.errors = result.result as any;
    //     }
    //   },
    //   () => {
    //     this.toast.showToast('something went wrong..! please try again later');
    //   }
    // );
  }
}
