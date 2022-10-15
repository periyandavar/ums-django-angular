import { ToastService } from './../../shared/service/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../shared/service/login.service';
import {
  ActivatedRouteStub,
  RouterLinkDirectiveStub,
} from '../../test/test-helper';
import { MockLoginService } from '../../test/mocks/login-service-mock';

let component: RegisterComponent;
let fixture: ComponentFixture<RegisterComponent>;

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, RouterLinkDirectiveStub],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: LoginService, useClass: MockLoginService },
        { provide: ToastService, useValue: toaster },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', () => {
    const username = fixture.nativeElement.querySelector('#username');
    const password = fixture.nativeElement.querySelector('#password_first');
    const confirmPassword =
      fixture.nativeElement.querySelector('#password_second');

    username.value = 'samp';
    password.value = 'Samp';
    confirmPassword.value = 'Samp';
    expect(fixture.componentInstance.registerFormGroup.invalid).toBe(true);

    username.value = 'samp';
    password.value = 'Samp@123';
    confirmPassword.value = 'Samp@12';
    expect(fixture.componentInstance.registerFormGroup.invalid).toBe(true);

    username.value = 'samp';
    password.value = 'Samp@123';
    confirmPassword.value = 'Samp@123';
    expect(fixture.componentInstance.registerFormGroup.invalid).toBe(false);

    spyOn(fixture.componentInstance, 'register');
    spyOn(window, 'alert');
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.componentInstance.register();
    fixture.detectChanges();
    expect(toaster.showToast).toHaveBeenCalled();
    // fixture.detectChanges();

    // expect(window.alert).toHaveBeenCalled();
  });
});

