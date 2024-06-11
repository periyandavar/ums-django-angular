import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  routingComponents,
  PassMatchValidatorDirective,
  StrongPasswordDirective,
  ProfileRoutingModule,
  SharedModule,
} from './index';

@NgModule({
  declarations: [
    routingComponents,
    PassMatchValidatorDirective,
    StrongPasswordDirective,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
