import { ToastService } from './../../../../shared/service/toast.service';
import { StreamService } from './../../service/stream.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStreamComponent } from './new-stream.component';
import { ActivatedRouteStub, RouterLinkDirectiveStub } from '../../../../test/test-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStreamService } from '../../../../test/mocks/stream-service-mock';

describe('NewStreamComponent', () => {
  let component: NewStreamComponent;
  let fixture: ComponentFixture<NewStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStreamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: NewStreamComponent;
let fixture: ComponentFixture<NewStreamComponent>;

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('StreamComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStreamComponent, RouterLinkDirectiveStub],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: StreamService, useClass: MockStreamService },
        { provide: ToastService, useValue: toaster },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', () => {
    const value = fixture.nativeElement.querySelector('#stream_value');
    
    value.value = '';
    expect(fixture.componentInstance.formGroup.invalid).toBe(true);

    value.value = 'sample';
    expect(fixture.componentInstance.formGroup.invalid).toBe(false);

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
