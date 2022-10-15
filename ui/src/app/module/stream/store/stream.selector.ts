import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StreamState, StreamAdapter } from './stream.state';
import { getCurrentRoute, RouterStateUrl } from '../../../store/router';

const getStreamsState = createFeatureSelector<StreamState>('streams');

export const streamSelectors = StreamAdapter.getSelectors();

export const getStreams = createSelector(
    getStreamsState,
    streamSelectors.selectAll
);

export const getTcount = createSelector(
    getStreamsState,
    (data)=> {
        return data.tcount;
    }
)

export const getStreamEntities = createSelector(
    getStreamsState,
    streamSelectors.selectEntities
);

// export const getStreamById = createSelector(
//     streamSelectors.selectEntities,
//     getCurrentRouteState,
//     (streams, route: RouterStateUrl) => {
//         return streams ? streams[route.params['id']]: null;
//     }

// )

export const getCurrentStream = createSelector(
    getStreams,
    getCurrentRoute,
    (streams, route:RouterStateUrl) => {
        return streams ? streams.find((stream) => 
            stream.id === parseInt(route.params["id"] as any, 10)
        ): null;
    }
)