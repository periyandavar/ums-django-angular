import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gender, GenderService } from './index';
import { ToastService } from '../../shared/index';
import { GenderDataService } from './service/gender-data.service';
import { GenderEntityService } from './service/gender-entity.service';
import { AppState } from 'src/app/store';
import { setPage } from '../../store/app.action';
import { Observable, Subscription } from 'rxjs';
import { getTcount } from '../../store/app.select';
import { genderActions } from './store';
import { setLoadingSpinner } from '../../shared/store/shared.action';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
})
export class GenderComponent implements OnInit, OnDestroy {
  // public genders: Gender[] = [];
  public genders$!: Observable<Gender[]>;
  public totalRecords!: number;//this.genderDataService.getTCount();
  public page: number = 1;
  public itemsPerPage = 5;
  private subscription!: Subscription;

  public constructor(
    private genderService: GenderService,
    private genderDataService: GenderEntityService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.subscription = this.store.select(getTcount).subscribe(
      (data) => {
        console.log(data);
        this.totalRecords = data;
      }
    )
    this.store.dispatch(setPage({page:1}));
    this.store.dispatch(setLoadingSpinner({status:true}));

    this.genders$ = this.genderDataService.getAll();
    
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeStatus(gender: Gender, status: boolean) {
        gender = {
          ...gender,
          status: status
        }
        // this.genderDataService.update(gender);
        this.store.dispatch(setLoadingSpinner({status:true}));
        this.store.dispatch(genderActions.changeGenderStatus({id:gender.id as any, status:status}))
      
    // this.genderService.changeStatus(id, status).subscribe(
    //   () => {
    //     location.reload();
    //   },
    //   (error) => {
    //     this.toastService.showToast(
    //       'something went wrong.. please try again later'
    //     );
    //     console.log(error.status);
    //   }
    // );
  }

  public getPage(page: number) {
    // this.genderService.getGenders(page).subscribe(
    //   (result) => {
    //     this.genders = result.data;
    //     this.totalRecords = result.tcount;
    //   },
    //   (error) => {
    //     this.toastService.showToast(
    //       'unable to fetch the data.. please try again later'
    //     );
    //     console.log(error.status);
    //   }
    // );
    this.store.dispatch(setPage({page:page}));
    this.genders$ = this.genderDataService.getAll();
    // this.totalRecords = this.genderDataService.getTCount();
  }
}
