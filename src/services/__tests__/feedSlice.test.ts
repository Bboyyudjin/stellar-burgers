import { TOrder } from "@utils-types";
import {feedFetch, feedSlice, initialState, selectFeedError, selectFeedLoading, selectFeedOrders, selectTotal, selectTotalToday} from "../slices/feedSlice";

describe('feedSlice', () => {

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-04-12T08:42:12.687Z',
      updatedAt: '2023-04-12T08:42:12.687Z',
      number: 12345
    }
  ];

  it('тест initialState', () => {
    expect(feedSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  describe('тест extraReducers', () => {
      it('тест feedFetch.pending', () => {
        const action = { type: feedFetch.pending.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: null
        });
      })
  
      it('тест feedFetch.fullfield', () => {
        const action = { 
          type: feedFetch.fulfilled.type,
          payload: {
            orders: mockOrders,
            total: 100,
            totalToday: 10
          }
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({
          orders: mockOrders,
          total: 100,
          totalToday: 10,
          loading: false,
          error: null
        });
      })
  
      it('тест feedFetch.rejected', () => {
        const errorMessage = 'Ошибка запроса ленты заказов'
        const action = { 
          type: feedFetch.rejected.type,
          error: {message: errorMessage}
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error: errorMessage
        });
      })
    })
  
    describe('тест Selectors', () => {
      const state = {
        feed: {
          orders: mockOrders,
          total: 100,
          totalToday: 5,
          loading: true,
          error: 'Ошибка'
        }
      };
  
      it('селектор FeedOrders', () => {
      expect(selectFeedOrders(state)).toEqual(mockOrders);
    });

    it('селектор Total', () => {
      expect(selectTotal(state)).toBe(100);
    });

    it('селектор TotalToday', () => {
      expect(selectTotalToday(state)).toBe(5);
    });

    it('селектор FeedLoading', () => {
      expect(selectFeedLoading(state)).toBe(true);
    });

    it('селектор FeedError', () => {
      expect(selectFeedError(state)).toBe('Ошибка');
    });
    });
})
