import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodGroupRoutingModule, routingComponents } from './';
import { SharedModule } from '../../shared';
import { StoreModule } from '@ngrx/store';
import { bloodGroupReducer, BloodGroupEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { BLOOD_GROUP_STORE } from './store';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    SharedModule,
    BloodGroupRoutingModule,
    StoreModule.forFeature(BLOOD_GROUP_STORE, bloodGroupReducer),
    EffectsModule.forFeature([BloodGroupEffects]),
  ],
})
export class BloodGroupModule {}
