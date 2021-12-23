import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import authApi, { AuthApiProps } from "src/api/auth-api";
import { payloadCreator } from "src/constants/helper";
import LocalStorage from "src/constants/local-storage";
import type { RootState } from "src/store";

type SliceState = {profile: {
  _id?: string | null;
  role?: [];
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}}

const initialState: SliceState = {
    profile: {
      ...JSON.parse(localStorage.getItem(LocalStorage.user)|| '[]')
    },
}

export const register = createAsyncThunk('auth/register', payloadCreator(authApi.register))
export const login = createAsyncThunk('auth/login', payloadCreator(authApi.login))
export const logout = createAsyncThunk('auth/logout', async ( arg:  undefined ,thunkAPI ) => {
  try {
  const res = await authApi.logout();
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error) 
  }  
})

const handleAuthFullfield = (state : WritableDraft<SliceState>, action :  PayloadAction<any, string, {
  arg: AuthApiProps;
  requestId: string;
  requestStatus: "fulfilled";
}, never>) => {
  const {user, access_token } = action.payload.data
  console.log(access_token)
  state.profile = user
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, handleAuthFullfield)
    builder.addCase(login.fulfilled, handleAuthFullfield)
    builder.addCase(logout.fulfilled, (state : WritableDraft<SliceState>, action :  PayloadAction<any, string, {
      requestId: string;
      requestStatus: "fulfilled";
    }, never>) => {
      state.profile = {}
      localStorage.removeItem(LocalStorage.user);
      localStorage.removeItem(LocalStorage.accessToken)

    })
  }
})

const authReducer = authSlice.reducer
export const {  } = authSlice.actions
export default authReducer