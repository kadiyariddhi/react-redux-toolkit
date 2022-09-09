import { createSlice } from '@reduxjs/toolkit'
import { signupUser, signInUser } from './authAPI';

const initialState = {
  username: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.email = payload?.user?.email;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signupUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.msg;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(signInUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signInUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
  },
});

export const { clearState } = authSlice.actions

export default authSlice.reducer