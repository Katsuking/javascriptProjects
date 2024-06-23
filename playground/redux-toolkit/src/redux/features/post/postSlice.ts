import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const URL = 'https://jsonplaceholder.typicode.com/posts';

export type PostState = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostInitialState = {
  posts: PostState[];
  post: PostState;
  isLoading: boolean;
};

const initialState: PostInitialState = {
  posts: [],
  post: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  },
  isLoading: true,
};

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Fetching data failed');
  const data = await res.json();
  return data;
});

// export const getPo = createAsyncThunk(
//   'post/getPostById',
//   async (id: number) => {
//     const res = await fetch(URL);
//     if (!res.ok) throw new Error('Fetching data failed');
//     const data = await res.json();
//     const post = data.find((item: PostState) => item.id === id);
//     return post;
//   },
// );

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostById: (state, action) => {
      state.isLoading = false;
      const post = state.posts.find((item) => item.id === action.payload);
      if (post && post.id !== 0) {
        state.post = post;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getPosts.fulfilled,
        (state, action: PayloadAction<PostState[]>) => {
          state.isLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { getPostById } = postSlice.actions;

export default postSlice.reducer;
