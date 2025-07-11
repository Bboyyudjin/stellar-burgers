import store, { rootReducer } from './store';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';


describe('rootReducer', () => {
  it('Инициализация состояния', () => {
    const expectedState = {
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
    };
    
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(expectedState);
  });

  it('Проверка редьюсеров', () => {
    const state = store.getState();
    expect(state).toHaveProperty(burgerConstructorSlice.name);
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });
});
