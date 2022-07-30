import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  isLoading: true,
  theme: true,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setTheme(state, action) {
      state.theme = !state.theme;
    },
    resetStore() {
      return initialState;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
