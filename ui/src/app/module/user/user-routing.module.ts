import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ViewUsersComponent,
  NewUserComponent,
  UserDetailComponent,
  EditUserComponent,
  UserComponent,
  UserResolver,
} from './index';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ViewUsersComponent,
        data: { animation: 'sideInPage' },
      },
      {
        path: 'new',
        component: NewUserComponent,
        data: { animation: 'sideInPage' },
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
        data: { animation: 'sideInPage' },
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: { animation: 'sideInPage' },
        resolve: { user: UserResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

export const routingComponents = [];
