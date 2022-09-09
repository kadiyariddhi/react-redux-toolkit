import { createSlice } from '@reduxjs/toolkit'
import { getUserList, createUser } from './userAPI';

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  users: []
}
const userSlice = createSlice({
  name: 'user',
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
      .addCase(getUserList.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.users = payload;
      })
      .addCase(getUserList.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUserList.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.msg;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.users = state.users.concat(payload.user)
      })
      .addCase(createUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});

export const { clearState } = userSlice.actions

export default userSlice.reducer