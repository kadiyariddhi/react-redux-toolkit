import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddUserForm } from "../../app/interface";
import { getHeaders } from "../../Helper/config";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUserList = createAsyncThunk(
  'getUserList',
  async (thunkAPI: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, getHeaders());
      if (response) {
        return [...response.data];
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'createUser',
  async (payload: AddUserForm, thunkAPI: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, payload, getHeaders());
      if (response) {
        return {...response.data};
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);