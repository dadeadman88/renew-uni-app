import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../utils/types";
import { AuthActions } from "../actions/AuthActions";

const initialState: Auth = {
  user: null,
  isLoggedIn: false,
  refreshToken: "",
  accessToken: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    LogoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.refreshToken = "";
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthActions.Login.fulfilled, (state, action) => {
      state.user = action.payload?.user;
      state.isLoggedIn = true;
      state.refreshToken = action.payload?.refreshToken;
      state.accessToken = action.payload?.accessToken;
    });

    builder.addCase(AuthActions.Register.fulfilled, (state, action) => {
      state.user = action.payload?.user;
      state.isLoggedIn = true;
      state.refreshToken = action.payload?.refreshToken;
      state.accessToken = action.payload?.accessToken;
    });
  },
});

export const { LogoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
