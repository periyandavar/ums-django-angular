import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Gender: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  }
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
