import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent, NewCourseComponent, EditCourseComponent } from './index';


const routes: Routes = [
  { path: '', component: CourseComponent },
  {
    path: 'new',
    component: NewCourseComponent,
  },
  {
    path: 'edit/:id',
    component: EditCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}

export const routingComponents = [
  CourseComponent,
  NewCourseComponent,
  EditCourseComponent,
];
