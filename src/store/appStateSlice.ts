import { createSlice } from '@reduxjs/toolkit';

import { IState } from './storeTypes';

const initialState = {
  isAutorised: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAutorised = true;
    },
    logOut: (state) => {
      state.isAutorised = false;
    },
  },
});

export const getIsAutorised = (state: IState) => state.appState.isAutorised;

export const { logIn, logOut } = appStateSlice.actions;

export default appStateSlice.reducer;
