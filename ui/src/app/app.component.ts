import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/index';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { getLoading } from './shared/store/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  showLoading?: Observable<boolean>;

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }

  constructor(private store: Store<AppState>) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
