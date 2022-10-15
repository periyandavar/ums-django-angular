import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../index';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-educational-detail',
  templateUrl: './educational-detail.component.html',
  styleUrls: ['./educational-detail.component.css'],
})
export class EducationalDetailComponent implements OnInit, OnDestroy {
  public user!: User;
  private subscription!: Subscription;

  public constructor(private readonly userStore: UserStore) {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    console.log(this.userStore.user$);
    this.subscription = this.userStore.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
