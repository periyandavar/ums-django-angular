import { ToastService } from './../../../../shared/service/toast.service';
import { StreamService } from './../../service/stream.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreamComponent } from './edit-stream.component';
import { ActivatedRouteStub, RouterLinkDirectiveStub } from '../../../../test/test-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStreamService } from '../../../../test/mocks/stream-service-mock';

describe('EditStreamComponent', () => {
  let component: EditStreamComponent;
  let fixture: ComponentFixture<EditStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStreamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: EditStreamComponent;
let fixture: ComponentFixture<EditStreamComponent>;

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('StreamComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStreamComponent, RouterLinkDirectiveStub],
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
    fixture = TestBed.createComponent(EditStreamComponent);
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
