import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BloodGroup } from './index';
import { bloodGroupActions } from './store';
import { Subscription } from 'rxjs';
import { getBloodGroups } from './store';
import { setLoadingSpinner } from '../../shared/store';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css'],
})
export class BloodGroupComponent implements OnInit, OnDestroy {
  private bloodGroupSubscription?: Subscription;

  public bloodGroups: BloodGroup[] = [];
  public totalRecords: number = 0;
  public page: number = 1;
  public itemsPerPage = 5;

  public constructor(private store: Store<BloodGroup>) {}

  public getPage(page: number) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(bloodGroupActions.loadBloodGroups({ page: page }));
  }

  public ngOnInit(): void {
    this.bloodGroupSubscription = this.store
      .select(getBloodGroups)
      .subscribe((result) => {
        console.log(result);
        this.bloodGroups = result.bloodGroups;
        this.totalRecords = result.tcount;
      });
    this.getPage(1);
  }

  public ngOnDestroy() {
    this.bloodGroupSubscription?.unsubscribe();
  }

  public changeStatus(id: number, status: boolean) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(
      bloodGroupActions.changeBloodGroupStatus({ id: id, status: status })
    );
  }
}
