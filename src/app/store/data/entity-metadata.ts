import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

export const jsonRpcPaginationCollectionState = {
  count: 0,
  offset: 0,
  lastCall: 0
};

export function filterAny(entities: any[], pattern?: any) {
  return entities.filter(
    entry =>
      JSON.stringify(entry)
        .toLowerCase()
        .indexOf(pattern.toLowerCase()) >= 0
  );
}

export function selectId(entity: any) {
  return entity.id;
}

export function selectCoCode(entity: any) {
  return entity.coCode;
}

export const entityDispatcherOptions = {
  optimisticAdd: false,
  optimisticDelete: false,
  optimisticSaveEntities: false,
  optimisticUpdate: false,
  optimisticUpsert: false
};

export const entityMetadata: EntityMetadataMap = {
  Codelist: {
    filterFn: filterAny,
    entityDispatcherOptions: entityDispatcherOptions,
    additionalCollectionState: jsonRpcPaginationCollectionState,
    selectId: selectCoCode
  }
};

// Define plurals when necessary
const pluralNames = {
  Address: "Addresses",
  Party: "parties"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetadata,
  pluralNames
};
