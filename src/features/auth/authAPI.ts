import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginSubmitForm, RegisterSubmitForm } from '../../app/interface';
import { getHeaders } from '../../Helper/config';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const signupUser = createAsyncThunk(
  'signupUser',
  async (payload: RegisterSubmitForm, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, payload, getHeaders());
      if (response) {
        return { ...response.data };
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  'signInUser',
  async (payload: LoginSubmitForm, thunkAPI) => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, payload, getHeaders());
        if (response) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          return { ...response.data };
        } else {
          return thunkAPI.rejectWithValue(response);
        }
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
  }
);