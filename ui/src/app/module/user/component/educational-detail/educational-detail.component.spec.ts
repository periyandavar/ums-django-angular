import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalDetailComponent } from './educational-detail.component';

describe('EducationalDetailComponent', () => {
  let component: EducationalDetailComponent;
  let fixture: ComponentFixture<EducationalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
