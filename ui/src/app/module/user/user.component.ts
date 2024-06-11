import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/shared/animation/side-in-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ums',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [slideInAnimation],
})
export class UserComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
