import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveComponentModule } from '@ngrx/component';
import {
  IconDirective,
  EduactionDetailsPipe,
  CheckerDirective,
  HostDirective,
  ToastComponent,
  LoadingSpinnerComponent
} from './index';

@NgModule({
  declarations: [
    IconDirective,
    EduactionDetailsPipe,
    CheckerDirective,
    HostDirective,
    ToastComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReactiveComponentModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReactiveComponentModule,
    IconDirective,
    CheckerDirective,
    EduactionDetailsPipe,
    HostDirective,
    ToastComponent,
    LoadingSpinnerComponent
  ],
})
export class SharedModule {}
