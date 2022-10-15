import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../index';
import { ToastService } from '../../../../shared/index';
import { AppState } from 'src/app/store';
import { getUsers, UserActions } from '../../store';
import { Subscription } from 'rxjs';
import { getTcount } from '../../store';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  // public users: User[] = [];

  public totalRecords = 0;
  public page: number = 1;
  public itemsPerPage = 5;

  public users$ = this.store.select(getUsers);
  private subscription!: Subscription;

  public constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private store:Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.subscription = this.store.select(getTcount).subscribe(
      (data) => {
        this.totalRecords = data}
    )
    this.getPage(1);
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public deleteUser(id: number) {
    if (confirm(`Are you sure to delete this record #${id}`)) {
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.userService.deleteUser(id).subscribe((result) => {
        console.log(result);
        if (result == null) {
          this.toastService.showToast('Record deleted successfully');
          location.reload();
        }
        this.toastService.showToast('Unable to delete the record');
      });
      // this.store.dispatch(setLoadingSpinner({status:true}));
      // this.store.dispatch(UserActions.deleteUser({id: id}))
    }
  }

  public viewUser(id: number) {
    this.router.navigate([`${id}`], {
      relativeTo: this.route,
    });
  }

  public editUser(id: number) {
    this.router.navigate([`${id}`], {
      relativeTo: this.route,
    });
  }

  public getPage(page: number) {
    // this.userService.getUsers(page, this.itemsPerPage).subscribe(
    //   (result) => {
    //     this.users = result.data;
    //     this.totalRecords = result.tcount;
    //   },
    //   (error) => {
    //     console.log(error.status);
    //     this.toastService.showToast('Unable to load the data');
    //   }
    // );
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(UserActions.loadUsers({page:page}));
  }
}
