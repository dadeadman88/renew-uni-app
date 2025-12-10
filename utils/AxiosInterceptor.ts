import axios, { AxiosError } from "axios";
import { ToastPresets } from "react-native-ui-lib";
import { setLoading, showHideToast } from "../redux/slices/OtherSlice";
import { BASE_URL } from "./Endpoints";
import { ApiErrorResponse } from "./types";

// Lazy store getter to avoid circular dependency
let getStore: () => any;
export const setStoreReference = (storeGetter: () => any) => {
  getStore = storeGetter;
};

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    if (getStore) {
      let token = getStore().getState().auth?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    config.headers["Accept"] = "*/*";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => {
    console.warn("Axios response", res.data);
    if (getStore) {
      getStore().dispatch(setLoading(false));
    }
    return Promise.resolve(res);
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (getStore) {
      console.log("Axios error response", error.response?.data);
      getStore().dispatch(setLoading(false));
      getStore().dispatch(
        showHideToast({
          visible: true,
          message:
            error.message === "Network Error"
              ? "Please check your network"
              : error.response?.data?.message instanceof Array ? error.response?.data?.message.join("\n") : error.response?.data?.message,
          preset: ToastPresets.FAILURE,
        })
      );
    }
    return Promise.reject(error);
  }
);

export default client;
