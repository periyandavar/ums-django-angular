import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingComponents } from './index';

import { StreamRoutingModule, SharedModule } from './index';
import { StoreModule } from '@ngrx/store';
import { STREAM_STORE_NAME } from './store/stream.state';
import { streamReducer } from './store/';
import { StreamEffects } from './store/stream.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    StreamRoutingModule,
    SharedModule,
    StoreModule.forFeature(STREAM_STORE_NAME, streamReducer),
    EffectsModule.forFeature([StreamEffects]),
  ],
})
export class StreamModule {}
