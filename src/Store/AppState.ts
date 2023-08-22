import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IcategoriesListObject} from '../Screens/HomeScreen';

export interface AppState {
  categoriesList: IcategoriesListObject[];
}

const initialState: AppState = {
  categoriesList: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategoriesList: (
      state,
      action: PayloadAction<IcategoriesListObject[]>,
    ) => {
      state.categoriesList = action.payload;
    },
  },
});

export const {setCategoriesList} = appSlice.actions;

export default appSlice.reducer;
