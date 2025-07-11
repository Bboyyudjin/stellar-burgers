import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

export const getIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const result = await getIngredientsApi();
    return result;
  }
);

type TIngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.loading;
export const selectIngredientsError = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.error;
