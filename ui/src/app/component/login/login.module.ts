import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/index';

import { routingComponents, LoginRoutingModule } from './index';

@NgModule({
  declarations: [routingComponents],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
