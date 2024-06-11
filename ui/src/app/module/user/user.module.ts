import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
  UserComponent,
  ViewUsersComponent,
  UserDetailComponent,
  UserFormComponent,
  NewUserComponent,
  EditUserComponent,
  UserRoutingModule,
  SharedModule,
  PersonalDetailComponent,
  EducationalDetailComponent,
} from './';
import { USER_STORE_NAME } from './store/user.state';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store';

@NgModule({
  declarations: [
    UserComponent,
    ViewUsersComponent,
    UserDetailComponent,
    UserFormComponent,
    NewUserComponent,
    EditUserComponent,
    PersonalDetailComponent,
    EducationalDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_STORE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserModule {}
