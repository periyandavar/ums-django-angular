import { createAction, props } from '@ngrx/store';
import { Course } from '../';
import { Pagination, StatusChange } from '../../../shared';
import { Update } from '@ngrx/entity';

export const loadCourses = createAction(
  '[Course API] load courses',
  props<{ page: number }>()
);
export const loadCoursesSuccess = createAction(
  '[Course API] courses loaded successfully',
  props<{ course: Pagination<Course> }>()
);
export const loadCoursesFailure = createAction(
  '[Course API] an error occured on loading courses',
  props<{ error: any }>()
);
export const addCourse = createAction(
  '[Course API] add new course',
  props<{ data: any }>()
);
export const addCourseSuccess = createAction(
  '[Course API] new course is added successfully',
  props<{ id: number; data: any }>()
);
export const addCourseFailure = createAction(
  '[Course API] an error occured on adding course',
  props<{ error: any }>()
);
export const loadCourseById = createAction(
  '[Course API] fetch course by id',
  props<{ id: number }>()
);
export const loadCourseByIdFailure = createAction(
  '[Course API] an error occured on fetching course by id',
  props<{ error: any }>()
);
export const loadCourseByIdSuccess = createAction(
  '[Course API] course is fetched by id successfully',
  props<{ course: Course }>()
);
export const updateCourse = createAction(
  '[Course API] update course',
  props<{ id: number; data: any }>()
);
export const updateCourseSuccess = createAction(
  '[Course API] course is updated successfully',
  props<{ update: Update<Course> }>()
);
export const updateCourseFailure = createAction(
  '[Course API] an error occured on updating course',
  props<{ error: any }>()
);
export const deleteCourse = createAction('[Course API] delete course');
export const deleteCourseSuccess = createAction(
  '[Course API] course is deleted successfully'
);
export const deleteCoursesFailure = createAction(
  '[Course API] an error occured on deleting course',
  props<{ error: any }>()
);
export const changeCourseStatus = createAction(
  '[Course API] change course status',
  props<{ id: number; status: boolean }>()
);
export const changeCourseStatusSuccess = createAction(
  '[Course API] course status changed successfully',
  props<{ id: number; status: boolean }>()
);
export const changeCourseStatusFailure = createAction(
  '[Course API] an error occured on changing course satus',
  props<{ error: any }>()
);
