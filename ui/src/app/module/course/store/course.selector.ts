import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, CourseAdapter } from './course.state';
import { getCurrentRoute, RouterStateUrl } from '../../../store/router/';

const getCoursesState = createFeatureSelector<CourseState>('courses');

export const courseSelectors = CourseAdapter.getSelectors();

export const getCourses = createSelector(
    getCoursesState,
    courseSelectors.selectAll
);

export const getTcount = createSelector(
    getCoursesState,
    (data)=> {
        return data.tcount;
    }
)

export const getCourseEntities = createSelector(
    getCoursesState,
    courseSelectors.selectEntities
);

export const getCurrentCourse = createSelector(
    getCourses,
    getCurrentRoute,
    (courses, route:RouterStateUrl) => {
        return courses ? courses.find((course) => 
            course.id === parseInt(route.params["id"] as any, 10)
        ): null;
    }
)