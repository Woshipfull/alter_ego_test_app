import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import appStateReducer from './appStateSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    appState: appStateReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
