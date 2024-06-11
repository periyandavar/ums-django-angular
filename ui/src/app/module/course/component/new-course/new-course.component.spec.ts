import { Router, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseComponent } from './new-course.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Injector } from '@angular/core';
import { RouterLinkDirectiveStub, ActivatedRouteStub } from '../../../../test/test-helper';
import { CourseService } from '../../service/course.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { StreamService } from '../../../stream/service/stream.service';
import { MockStreamService } from '../../../../test/mocks/stream-service-mock';
import { MockCourseService } from '../../../../test/mocks/course-service-mock';
import { By } from '@angular/platform-browser';

fdescribe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSelectModule, ReactiveFormsModule],
      declarations: [NewCourseComponent, RouterLinkDirectiveStub],
      providers: [
        FormBuilder,
        Injector,
        {provide:Router, useValue:routerSpy},
        {provide:ActivatedRoute, useClass:ActivatedRouteStub},
        {provide:CourseService,  useClass:MockCourseService},
        {provide:StreamService, useClass: MockStreamService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form-submit', ()=> {
    const courseInput = fixture.nativeElement.querySelector('#course_value');
    const streamInput = fixture.nativeElement.querySelector('#education_course_streams');
    courseInput.value = "samp";
    streamInput.value = "1";
    spyOn(fixture.componentInstance, 'submit');
    spyOn(console, 'log');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(fixture.componentInstance.submit).toHaveBeenCalled();
  })

});
