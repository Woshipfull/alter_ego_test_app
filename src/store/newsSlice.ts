import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { INewsStore, IState } from './storeTypes';

const NEWS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchNews = createAsyncThunk(
  'posts/fetchPosts',
  async (startPoint: number) => {
    const params = {
      _start: startPoint,
      _limit: 5,
    };
    const response = await axios.get(NEWS_URL, { params });
    return response.data;
  }
);

export const removeNewsThunk = createAsyncThunk(
  'posts/removeNews',
  async (id: number) => {
    const url = `${NEWS_URL}/${id}`;
    await axios.delete(url);
    return id;
  }
);

const initialState: INewsStore = {
  news: [],
  status: 'idle',
  error: [],
  startPoint: 0,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    removeNews: (state, actions) => {
      const newState = state.news.filter(({ id }) => id !== actions.payload);
      state.news = newState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const loadedPosts = action.payload;
        state.news = state.news.concat(loadedPosts);

        state.error = [];

        if (state.startPoint >= 95) {
          state.startPoint = -1;
          return;
        }
        state.startPoint += 5;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error.push(action.error.message);
      })
      .addCase(removeNewsThunk.fulfilled, (state, action) =>
        newsSlice.caseReducers.removeNews(state, action)
      );
  },
});

export const selectNews = (state: IState) => state.news.news;
export const getStatus = (state: IState) => state.news.status;
export const getError = (state: IState) => state.news.error;
export const getStartPoint = (state: IState) => state.news.startPoint;

export default newsSlice.reducer;
