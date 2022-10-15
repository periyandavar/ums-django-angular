import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderComponent } from './gender.component';
import { GenderService } from './service/gender.service';
import { MockGenderService } from '../../test/mocks/gender-service.mock';

describe('GenderComponent', () => {
  let component: GenderComponent;
  let fixture: ComponentFixture<GenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderComponent ],
      providers: [
        { provide:GenderService, useClass: MockGenderService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
