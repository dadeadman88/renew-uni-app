import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/AxiosInterceptor";
import { authEndpoints } from "../../utils/Endpoints";
import { getDeviceInfo } from "../../utils/constants";
import { setLoading } from "../slices/OtherSlice";

export const AuthActions = {
  Login: createAsyncThunk(
    "auth/login",
    async (credentials: {
      email: string;
      password: string;
      rememberMe: boolean;
    },thunkAPI) => {
      thunkAPI.dispatch(setLoading(true));
      let apiCall = await client.post(authEndpoints.login, {...credentials, ...getDeviceInfo()});
      return apiCall.data?.data;
    }
  ),
  Register: createAsyncThunk("auth/register", async (data,thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    let apiCall = await client.post(authEndpoints.register, data);
    console.warn("Register apiCall", apiCall.data);
    return apiCall.data?.data;
  }),
  Logout: createAsyncThunk("auth/logout", async (data,thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    let apiCall = await client.post(authEndpoints.logout, {});
    return apiCall.data?.data;
  }),
};
