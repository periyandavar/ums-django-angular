import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Gender } from '../model/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderEntityService extends EntityCollectionServiceBase<Gender> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) { 
    super("Gender", serviceElementsFactory)
  }

}
