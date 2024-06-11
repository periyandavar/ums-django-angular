import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/index';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [],
})
export class LogoutComponent implements OnInit {
  public constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
