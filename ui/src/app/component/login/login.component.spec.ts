import { Router, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../shared/service/login.service';
import { MockLoginService } from '../../test/mocks/login-service-mock';
import { FormBuilder } from '@angular/forms';
import { ActivatedRouteStub } from '../../test/test-helper';
import { By } from '@angular/platform-browser';
import { ToastService } from '../../shared/service/toast.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        {provide:Router, useValue:routerSpy},
        {provide:ActivatedRoute, useClass:ActivatedRouteStub},
        {provide:LoginService, useClass: MockLoginService},
        {provide:ToastService, useValue: toaster}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', ()=> {
    const input = fixture.nativeElement.querySelector('#inputUsername');
    const password = fixture.nativeElement.querySelector('#inputPassword');
    input.value = "samp";
    password.value = "1";
    spyOn(fixture.componentInstance, 'login');
    spyOn(console, 'log');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(fixture.componentInstance.login).toHaveBeenCalled();
    expect(toaster.showToast).toHaveBeenCalled();
  })

});
