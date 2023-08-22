import {configureStore} from '@reduxjs/toolkit';
import appReducer from './AppState';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
