import { EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { StreamActions } from '.';
import { streamInitialState, StreamAdapter } from '.';
import { Stream } from '..';
const _streamReducer = createReducer(
    streamInitialState,
    on(StreamActions.addStreamSuccess, (state, {id, data}) => {
        const stream = {
            ...data,
            id: id
        }
        return StreamAdapter.addOne(stream, state);
    }),

    on(StreamActions.changeStreamStatusSuccess, (state, action) => {

        const update:Update<Stream> = {
            id: action.id,
            changes: {
                ...state.entities[action.id],
                status: action.status
            }
        }
        return StreamAdapter.updateOne(update, state);
    }),

    on(StreamActions.loadStreamsSuccess, (state, action) => {
        return StreamAdapter.setAll(action.stream.results, {...state, tcount:action.stream.count});
    }),

    on(StreamActions.updateStreamSuccess, (state, {update}) => {
        return StreamAdapter.updateOne(update, state);
    })
)

export function streamReducer(state: any, action: any) {

    return _streamReducer(state, action);
}