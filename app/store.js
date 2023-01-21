import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from './features/notification/notification.slice';
import {eventsApi} from '../services/events';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware), 
});


setupListeners(store.dispatch)
