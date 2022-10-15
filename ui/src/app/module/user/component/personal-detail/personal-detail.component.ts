import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../index';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css'],
})
export class PersonalDetailComponent implements OnInit, OnDestroy {
  private _user!: User;
  private subscription!: Subscription;

  public get user() {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(
        new URL('../../../../worker/calculate-age.worker.ts', import.meta.url)
      );
      worker.onmessage = ({ data }) => {
        this.age = data;
      };
      worker.postMessage(user.dob);
    } else {
      console.log('fallback error');
    }
  }

  public age: null | number = null;

  public constructor(private readonly userStore: UserStore) {
    this.subscription = this.userStore.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
