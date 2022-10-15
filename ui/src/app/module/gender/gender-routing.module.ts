import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GenderComponent,
  EditGenderComponent,
  NewGenderComponent,
} from './index';

const routes: Routes = [
  { path: '', component: GenderComponent },
  {
    path: 'edit/:id',
    component: EditGenderComponent,
  },
  {
    path: 'new',
    component: NewGenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenderRoutingModule {}

export const routingComponents = [
  GenderComponent,
  EditGenderComponent,
  NewGenderComponent,
];
