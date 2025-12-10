import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastProps } from "react-native-ui-lib";
import { Others } from "../../utils/types";

const initialState: Others = {
  loading: false,
  toast: null,
};

const OtherSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    showHideToast(state, action: PayloadAction<ToastProps>) {
      state.toast = action.payload as any;
    },
  },
});

export const { setLoading, showHideToast } = OtherSlice.actions;
export default OtherSlice.reducer;
