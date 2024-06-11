import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BloodGroupComponent,
  NewBloodGroupComponent,
  EditBloodGroupComponent,
} from './index';

const routes: Routes = [
  { path: '', component: BloodGroupComponent },
  {
    path: 'new',
    component: NewBloodGroupComponent,
  },
  {
    path: 'edit/:id',
    component: EditBloodGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodGroupRoutingModule {}

export const routingComponents = [
  BloodGroupComponent,
  EditBloodGroupComponent,
  NewBloodGroupComponent,
];
