import { GenderService } from './../../../gender/service/gender.service';
import { BloodGroupService } from './../../../blood-group/service/blood-group.service';
import { ToastService } from './../../../../shared/service/toast.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRouteStub, RouterLinkDirectiveStub } from '../../../../test/test-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserFormComponent } from './user-form.component';
import { Injector } from '@angular/core';
import { MockBloodGroupService } from '../../../../test/mocks/blood-group-service.mock';
import { StreamService } from '../../../stream/service/stream.service';
import { CourseService } from '../../../course/service/course.service';
import { MockStreamService } from '../../../../test/mocks/stream-service-mock';
import { MockCourseService } from '../../../../test/mocks/course-service-mock';
import { MockGenderService } from '../../../../test/mocks/gender-service.mock';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let component: UserFormComponent;
let fixture: ComponentFixture<UserFormComponent>;

const toaster = jasmine.createSpyObj('ToastService', ['showToast']);

fdescribe('StreamComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent, RouterLinkDirectiveStub],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Injector},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ToastService, useValue: toaster },
        { provide: BloodGroupService, useClass: MockBloodGroupService },
        { provide: GenderService, useClass: MockGenderService },
        { provide: CourseService, useClass: MockCourseService },
        { provide: StreamService, useClass: MockStreamService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', () => {
    const fname = fixture.nativeElement.querySelector('#user_firstName');
    fname.value = 'jkjkkj@1231-#';
    expect(component.userFormGroup.get('firstName')?.invalid).toBe(true);

    const lname = fixture.nativeElement.querySelector('#user_lastName');
    lname.value = 'jkjkkj@1231-#';
    expect(component.userFormGroup.get('lastName')?.invalid).toBe(true);

    const emailId = fixture.nativeElement.querySelector('#emailId-0');
    emailId.value = 'jkjkkj231-#';
    expect(component.emailIds.get('email')?.invalid).toBe(true);

    const mobileNo = fixture.nativeElement.querySelector('#mobileNo-0');
    mobileNo.value = 'jkjkkj@1231-#';
    expect(component.mobileNos.get('mobileNumber')?.invalid).toBe(true);


    const dob = fixture.nativeElement.querySelector('#user_dob');
    dob.value = '';
    expect(component.userFormGroup.get('dob')?.invalid).toBe(true);



    const stream1 = fixture.nativeElement.querySelector('#user_educationDetails_0_stream');
    stream1.value = '';
    expect(component.educationDetails?.at(0)?.get('stream')?.invalid).toBe(true);



    const stream2 = fixture.nativeElement.querySelector('#user_educationDetails_1_stream');
    stream2.value = '';
    expect(component.educationDetails?.at(1)?.get('stream')?.invalid).toBe(true);


    const percentage1 = fixture.nativeElement.querySelector('#user_educationDetails_0_percentage');
    percentage1.value = '200';
    expect(component.educationDetails?.at(0)?.get('percentage')?.invalid).toBe(true);



    const percentage2 = fixture.nativeElement.querySelector('#user_educationDetails_1_percentage');
    percentage2.value = '-10';
    expect(component.educationDetails?.at(1)?.get('percentage')?.invalid).toBe(true);


    const institution1 = fixture.nativeElement.querySelector('#user_educationDetails_0_institution');
    institution1.value = '';
    expect(component.educationDetails?.at(0)?.get('institution')?.invalid).toBe(true);


    const institution2 = fixture.nativeElement.querySelector('#user_educationDetails_1_institution');
    institution2.value = '';
    expect(component.educationDetails?.at(1)?.get('institution')?.invalid).toBe(true);

    const institutionAddress1 = fixture.nativeElement.querySelector('#user_educationDetails_0_institutionAddress');
    institutionAddress1.value = '';
    expect(component.educationDetails?.at(0)?.get('institutionAddress')?.invalid).toBe(true);

    const institutionAddress2 = fixture.nativeElement.querySelector('#user_educationDetails_1_institutionAddress');
    institutionAddress2.value = '';
    expect(component.educationDetails?.at(1)?.get('institutionAddress')?.invalid).toBe(true);

    const passout1 = fixture.nativeElement.querySelector('#user_educationDetails_0_passout');
    passout1.value = '';
    expect(component.educationDetails?.at(0)?.get('passout')?.invalid).toBe(true);

    const passout2 = fixture.nativeElement.querySelector('#user_educationDetails_1_passout');
    passout2.value = '';
    expect(component.educationDetails?.at(1)?.get('passout')?.invalid).toBe(true);

    const bloodGroup = fixture.nativeElement.querySelector('#user_bloodGroup');
    bloodGroup.value = '';
    expect(component.userFormGroup.get('bloodGroup')?.invalid).toBe(true);
    
    const gender = fixture.nativeElement.querySelector('#user_gender');
    gender.value = '';
    expect(component.userFormGroup.get('gender')?.invalid).toBe(true);
    
    expect(fixture.componentInstance.userFormGroup.invalid).toBe(true);

    fname.value = "Raja";
    lname.value = "Ram";
    emailId.value = "raja@ram.com";
    mobileNo.value = "9099099099";
    gender.value = "Male";
    bloodGroup.value = "A+";
    dob.value = "1999/12/21";

    stream1.value = "Maths";
    stream2.value = "Maths";

    institution1.value = "sample";
    institution2.value = "sample";

    institutionAddress1.value = "sam";
    institutionAddress2.value = "sam";

    percentage1.value = "90";
    percentage2.value = "89";

    passout1.value = "2015";
    passout2.value = "2017";

    expect(fixture.componentInstance.userFormGroup.invalid).toBe(false);

    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);
    // fixture.componentInstance.register();
    fixture.detectChanges();
    expect(toaster.showToast).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.onSubmit.emit).toHaveBeenCalled();

    // expect(window.alert).toHaveBeenCalled();
  });
});
