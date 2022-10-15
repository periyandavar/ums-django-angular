import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingComponents, GenderRoutingModule, SharedModule } from './index';
import { EntityDefinitionService, EntityDataService, EntityCollectionReducerRegistry } from '@ngrx/data';
import { GenderDataService } from './service/gender-data.service';
import { entityMetadata } from '../../entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { GenderEffects } from './store/gender.effect';
import { GenderReducerMap, genderReducer } from './store/gender.reducer';

@NgModule({
  declarations: [routingComponents],
  imports: [CommonModule, GenderRoutingModule, SharedModule, EffectsModule.forFeature([GenderEffects])],
})
export class GenderModule {
  constructor(eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    genderDataService: GenderDataService,
    ) {
      eds.registerMetadataMap(entityMetadata)
      entityDataService.registerService("Gender", genderDataService);
    }
}
