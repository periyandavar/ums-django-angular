import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/index';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  animations: [slideInAnimation]
})
export class AppLayoutComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animationState'];
   }
}
