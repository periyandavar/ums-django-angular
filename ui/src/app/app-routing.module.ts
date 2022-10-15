import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './index';
import { LogoutComponent, PageNotFoundComponent } from './component/index';
import { AppLayoutComponent } from './layout/index';
///ngrx, text cases, 
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () =>
          import('./module/user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
      {
        path: 'genders',
        loadChildren: () =>
          import('./module/gender/gender.module').then((m) => m.GenderModule),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
      {
        path: 'blood-groups',
        loadChildren: () =>
          import('./module/blood-group/blood-group.module').then(
            (m) => m.BloodGroupModule
          ),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./module/course/course.module').then((m) => m.CourseModule),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
      {
        path: 'streams',
        loadChildren: () =>
          import('./module/stream/stream.module').then((m) => m.StreamModule),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./module/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthGuard],
        data: { animationState: 'sideInPage' },
      },
    ],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./component/login/login.module').then((m) => m.LoginModule),
    data: { animationState: 'sideInPage' },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./module/register/register.module').then((m) => m.RegisterModule),
  },
  { path: 'logout', component: LogoutComponent },

  {
    path: 'error',
    loadChildren: () =>
      import('./module/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animationState: 'sideInPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
