import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Stream } from '..';

export const STREAM_STORE_NAME = "streams";

export interface StreamState extends EntityState<Stream> {
    tcount: number
}

export const StreamAdapter = createEntityAdapter<Stream>(

);

export const streamInitialState: StreamState = StreamAdapter.getInitialState({
    tcount: 0
});
