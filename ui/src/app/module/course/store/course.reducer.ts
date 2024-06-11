import { EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { courseActions } from '.';
import { courseInitialState, CourseAdapter } from './';
import { Course } from '../';
const _courseReducer = createReducer(
    courseInitialState,
    on(courseActions.addCourseSuccess, (state, {id, data}) => {
        const course = {
            ...data,
            id: id
        }
        return CourseAdapter.addOne(course, state);
    }),

    on(courseActions.changeCourseStatusSuccess, (state, action) => {

        const update:Update<Course> = {
            id: action.id,
            changes: {
                ...state.entities[action.id],
                status: action.status
            }
        }
        return CourseAdapter.updateOne(update, state);
    }),

    on(courseActions.loadCoursesSuccess, (state, action) => {
        return CourseAdapter.setAll(action.course.results, {...state, tcount:action.course.count});
    }),

    on(courseActions.updateCourseSuccess, (state, {update}) => {
        return CourseAdapter.updateOne(update, state);
    })
)

export function courseReducer(state: any, action: any) {

    return _courseReducer(state, action);
}