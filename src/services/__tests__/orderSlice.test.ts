import { TOrder } from "@utils-types";
import {clearOrderModalData, createOrder, fetchOrderByNumber, fetchUserOrders, initialState, orderSlice, selectOrderError, selectOrderLoading, selectOrderModalData, selectOrderRequest, selectUserOrders, setOrderModalData} from "../slices/orderSlice";

describe('orderSlice', () => {

  const mockOrder: TOrder = {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-04-12T08:42:12.687Z',
      updatedAt: '2023-04-12T08:42:12.687Z',
      number: 12345
    }

  it('тест initialState', () => {
    expect(orderSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  describe('тест reducers', () => {
    it('тест setOrderModalData', () => {
      const action = setOrderModalData(mockOrder);
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderModalData).toEqual(mockOrder);
    })

    it('тест clearOrderModalData', () => {
      const stateWithData = { ...initialState, orderModalData: mockOrder };
      const action = clearOrderModalData();
      const state = orderSlice.reducer(stateWithData, action);
      expect(state).toEqual(initialState)
    })
  })

  describe('тест extraReducers', () => {
    describe('createOrder', () => {
      it('тест createOrder.pending', () => {
        const action = { type: createOrder.pending.type };      
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          orderRequest: true,
          error: null
        });
      })
  
      it('тест createOrder.fullfilled', () => {
        const action = { 
          type: createOrder.fulfilled.type,
          payload: mockOrder
        };      
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        orderModalData: mockOrder
        });
      })

      it('тест createOrder.rejected', () => {
        const errorMessage = 'Ошибка создания заказа'
        const action = { 
          type: createOrder.rejected.type,
          error: {message: errorMessage}
        };       
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          orderRequest: false,
          error: errorMessage
        });
      })
    })

    describe('fetchUserOrders', () => {
      it('тест fetchUserOrders.pending', () => {
        const action = { type: fetchUserOrders.pending.type };      
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: null
        });
      })
  
      it('тест fetchUserOrders.fullfilled', () => {
        const action = { 
          type: fetchUserOrders.fulfilled.type,
          payload: [mockOrder]
        };   
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
        ...initialState,
        loading: false,
        userOrders: [mockOrder]
        });
      })

      it('тест fetchUserOrders.rejected', () => {
        const errorMessage = 'Ошибка получения списка заказов пользователя'
        const action = { 
          type: fetchUserOrders.rejected.type,
          error: {message: errorMessage}
        };       
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error: errorMessage
        });
      })
    })

    describe('fetchOrderByNumber', () => {
      it('тест fetchOrderByNumber.pending', () => {
        const action = { type: fetchOrderByNumber.pending.type };      
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: null
        });
      })
  
      it('тест fetchOrderByNumber.fullfilled', () => {
        const action = { 
          type: fetchOrderByNumber.fulfilled.type,
          payload: mockOrder.number
        };      
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        orderModalData: mockOrder.number
        });
      })

      it('тест fetchUserOrders.rejected', () => {
        const errorMessage = 'Ошибка получения данных заказа'
        const action = { 
          type: fetchUserOrders.rejected.type,
          error: {message: errorMessage}
        };       
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          orderRequest: false,
          error: errorMessage
        });
      })
    })
  })
  
  describe('тест Selectors', () => {
    const state = {
      order: {
        userOrders: [mockOrder],
        loading: true,
        error: 'Ошибка',
        orderRequest: false,
        orderModalData: mockOrder
      }
    };

    it('селектор UserOrders', () => {
      expect(selectUserOrders(state)).toEqual([mockOrder]);
    });

    it('селектор OrderLoading', () => {
      expect(selectOrderLoading(state)).toBe(true);
    });

    it('селектор OrderError', () => {
      expect(selectOrderError(state)).toBe('Ошибка');
    });

    it('селектор OrderRequest', () => {
      expect(selectOrderRequest(state)).toBe(false);
    });

    it('селектор OrderModalData', () => {
      expect(selectOrderModalData(state)).toEqual(mockOrder);
    });
  });
})
