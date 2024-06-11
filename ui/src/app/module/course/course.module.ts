import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { COURSE_STORE_NAME, courseReducer, CourseEffects } from './store/';
import { EffectsModule } from '@ngrx/effects';

import {
  routingComponents,
  CourseRoutingModule,
  SharedModule,
} from './index'

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    CourseRoutingModule, 
    SharedModule, 
    NgSelectModule,
    StoreModule.forFeature(COURSE_STORE_NAME, courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ]
})
export class CourseModule {}
