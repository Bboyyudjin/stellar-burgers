import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

export const feedFetch = createAsyncThunk('feed/fetchAll', async () => {
  const result = await getFeedsApi();
  return result;
});

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedFetch.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(feedFetch.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.error.message || 'Ошибка запроса ленты заказов');
      })
      .addCase(feedFetch.fulfilled, (state, action) => {
        (state.loading = false), (state.orders = action.payload.orders);
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export default feedSlice.reducer;

export const selectFeedOrders = (state: { feed: TFeedState }) =>
  state.feed.orders;
export const selectTotal = (state: { feed: TFeedState }) => state.feed.total;
export const selectTotalToday = (state: { feed: TFeedState }) =>
  state.feed.totalToday;
export const selectFeedLoading = (state: { feed: TFeedState }) =>
  state.feed.loading;
export const selectFeedError = (state: { feed: TFeedState }) =>
  state.feed.error;
