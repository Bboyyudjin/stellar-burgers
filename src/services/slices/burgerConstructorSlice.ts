import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

type TConstructorIngredient = TIngredient & { id: string };

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type !== 'bun') {
          state.ingredients = [...state.ingredients, action.payload];
        } else {
          state.bun = action.payload;
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; newIndex: number }>
    ) => {
      const { index, newIndex } = action.payload;
      const item = state.ingredients[index];

      const newIngredients = [...state.ingredients];
      newIngredients.splice(index, 1);
      newIngredients.splice(newIndex, 0, item);

      state.ingredients = newIngredients;
    },

    clearConstructor: () => initialState
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectConstructorIngredients = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => state.burgerConstructor.ingredients;
export const selectConstructorBun = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => state.burgerConstructor.bun;
export const selectConstructorItems = (state: {
  burgerConstructor: TBurgerConstructorState;
}) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});
