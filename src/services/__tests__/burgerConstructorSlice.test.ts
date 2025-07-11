import {burgerConstructorSlice, addIngredient, removeIngredient, moveIngredient, clearConstructor, initialState, selectConstructorIngredients, selectConstructorBun, selectConstructorItems} from "../slices/burgerConstructorSlice";
import { TIngredient } from "@utils-types";

describe('burgerConstructorSlice', () => {

  const bun: TIngredient = {
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
        }

        const ingredient: TIngredient = {
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

  it('тест initialState', () => {
    expect(burgerConstructorSlice.reducer(undefined, {type: 'unknow'})).toEqual(initialState)
  })

  it('тест добавления булки', () => {
    const action = addIngredient(bun);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.bun).toMatchObject(bun);
  })

  it('тест добавления ингредиента', () => {
    const action = addIngredient(ingredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient)
    expect(state.ingredients[0]).toHaveProperty('_id')
  })

  it('тест удаления ингредиента', () => {
    const initialStateWithIngredient = {
      ...initialState, 
      ingredients: [
      {...ingredient, id:'2'}
    ]};
    expect(initialStateWithIngredient.ingredients).toHaveLength(1);
    const action = removeIngredient('2');
    const state = burgerConstructorSlice.reducer(initialStateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  })
  
  it('тест перемещения ингредиента', () => {
    const ingredients = [
      {...ingredient, id:'1'},
      {...ingredient, id:'2'},
      {...ingredient, id:'3'}
    ];

    const initialStateWithIngredients = {
      ...initialState, 
      ingredients
    }
    expect(initialStateWithIngredients.ingredients.map(ingredient => ingredient.id)).toEqual(['1','2','3'])
    const action = moveIngredient({ index: 0, newIndex: 2 });
    const state = burgerConstructorSlice.reducer(initialStateWithIngredients, action);
    expect(state.ingredients.map(ingredient => ingredient.id)).toEqual(['2','3','1'])
  })
 
  it('тест очистки конструктора', () => {
    const initialStateWithIngredient = {
      bun: {...bun, id:'1'},
      ingredients: [{...ingredient, id:'2'}]
    };
    const action = clearConstructor();
    const state = burgerConstructorSlice.reducer(initialStateWithIngredient, action);
    expect(state).toEqual(initialState)
  })

  describe('тест Selectors', () => {
    const state = {
      burgerConstructor: {
      bun: {...bun, id:'1'},
      ingredients: [{...ingredient, id:'2'}]
    }
    };

    it('селектор ConstructorIngredients', () => {
      expect(selectConstructorIngredients(state)).toEqual([{...ingredient, id:'2'}]);
    });

    it('селектор ConstructorBun', () => {
      expect(selectConstructorBun(state)).toEqual({...bun, id:'1'});
    });

    it('селектор ConstructorItems', () => {
      expect(selectConstructorItems(state)).toEqual({
        bun: {...bun, id:'1'},
        ingredients: [{...ingredient, id:'2'}]
      });
    });
  });
})
