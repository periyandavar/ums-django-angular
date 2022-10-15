import { EntityCollection, EntitySelectorsFactory } from "@ngrx/data";
import { Gender } from '../model/gender';
import { createSelector } from '@ngrx/store';

export const selectGenders =
    (entities: EntityCollection<Gender>) => entities.entities;

export const selectGenderById = (id: number) => createSelector(
    selectGenders,
    entities => entities[id]
);