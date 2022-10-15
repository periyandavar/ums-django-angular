import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../';

export const COURSE_STORE_NAME = "courses";

export interface CourseState extends EntityState<Course> {
    tcount: number
}

export const CourseAdapter = createEntityAdapter<Course>(

);

export const courseInitialState: CourseState = CourseAdapter.getInitialState({
    tcount: 0
});
