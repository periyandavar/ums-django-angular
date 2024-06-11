import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routingComponents, ErrorPageRoutingModule } from './index';

@NgModule({
  declarations: [routingComponents],
  imports: [CommonModule, ErrorPageRoutingModule],
})
export class ErrorPageModule {}
