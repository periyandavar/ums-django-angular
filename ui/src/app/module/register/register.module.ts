import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RegisterRoutingModule,
  SharedModule,
  routingComponents,
} from './index';

@NgModule({
  declarations: [routingComponents],
  imports: [CommonModule, RegisterRoutingModule, SharedModule],
})
export class RegisterModule {}
