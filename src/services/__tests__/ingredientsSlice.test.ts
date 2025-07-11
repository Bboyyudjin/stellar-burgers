import {ingredientsSlice, getIngredients, initialState, selectIngredients, selectIngredientsLoading, selectIngredientsError} from "../slices/ingredientsSlice";
import { TIngredient } from "@utils-types";

describe('ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
        {
            "_id": "1",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        },
        {
            "_id": "2",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        }
    ]

  it('тест initialState', () => {
    expect(ingredientsSlice.reducer(undefined, {type: 'unknow'})).toEqual(initialState)
  })

  describe('тест extraReducers', () => {
    it('тест getIngredients.pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    })

    it('тест getIngredients.fullfield', () => {
      const action = { 
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({
        items: mockIngredients,
        loading: false,
        error: null
      });
    })

    it('тест getIngredients.rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов'
      const action = { 
        type: getIngredients.rejected.type,
        error: {message: errorMessage}
      };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    })
  })

  describe('тест Selectors', () => {
    const state = {
      ingredients: {
        items: mockIngredients,
        loading: true,
        error: 'Ошибка'
      }
    };

    it('Селектор Ingredients', () => {
      expect(selectIngredients(state)).toEqual(mockIngredients);
    });

    it('Селектор IngredientsLoading', () => {
      expect(selectIngredientsLoading(state)).toBe(true);
    });

    it('Селектор IngredientsError', () => {
      expect(selectIngredientsError(state)).toBe('Ошибка');
    });
  });
})
