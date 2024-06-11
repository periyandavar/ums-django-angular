import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StreamComponent,
  NewStreamComponent,
  EditStreamComponent,
} from './index';

const routes: Routes = [
  { path: '', component: StreamComponent },
  {
    path: 'new',
    component: NewStreamComponent,
  },
  {
    path: 'edit/:id',
    component: EditStreamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamRoutingModule {}

export const routingComponents = [
  StreamComponent,
  EditStreamComponent,
  NewStreamComponent,
];
