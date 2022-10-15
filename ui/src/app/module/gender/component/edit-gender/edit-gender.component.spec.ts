import { ToastService } from './../../../../shared/service/toast.service';
import { GenderService } from './../../service/gender.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGenderComponent } from './edit-gender.component';
import { ActivatedRouteStub, RouterLinkDirectiveStub } from '../../../../test/test-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MockGenderService } from '../../../../test/mocks/gender-service.mock';
import { By } from '@angular/platform-browser';

describe('EditGenderComponent', () => {
  let component: EditGenderComponent;
  let fixture: ComponentFixture<EditGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGenderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: EditGenderComponent;
let fixture: ComponentFixture<EditGenderComponent>;

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('GenderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGenderComponent, RouterLinkDirectiveStub],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: GenderService, useClass: MockGenderService },
        { provide: ToastService, useValue: toaster },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', () => {
    const value = fixture.nativeElement.querySelector('#gender_value');
    
    value.value = '';
    expect(fixture.componentInstance.genderFormGroup.invalid).toBe(true);

    value.value = 'not to say';
    expect(fixture.componentInstance.genderFormGroup.invalid).toBe(false);

    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    // fixture.componentInstance.register();
    fixture.detectChanges();
    expect(toaster.showToast).toHaveBeenCalled();
    // fixture.detectChanges();

    // expect(window.alert).toHaveBeenCalled();
  });
});
