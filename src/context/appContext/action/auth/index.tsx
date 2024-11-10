import config from "react-native-config";

import TYPES from "@instagram/context/appContext/types";
import { useAccess } from "@instagram/customHooks/useAccess";
import { GET, POST } from "@instagram/context/appContext/apiManagement/index.tsx";

const { ACCESS_KEY, LOGINURL } = config;

export const loginRequest = (dispatch: any) => async (params: any) => {
    try {
        const loginResponse = await POST('http://192.168.2.52:5000/login', params, {});
        console.log("Login", loginResponse);
        await useAccess("userToken", JSON.stringify(loginResponse?.data?.token));
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: loginResponse });
    } catch (error) {
        dispatch({ type: TYPES.LOGIN_FAILURE, payload: error });
    }
};

export const logOutRequest = (dispatch: any) => async () => {
    try {
        const response = await GET(LOGINURL, {});
        __DEV__ && console.log("LogOut", response);
        await useAccess("userToken", "");
        dispatch({ type: TYPES.LOGOUT_SUCCESS, payload: {} });
    } catch (error) {
        dispatch({ type: TYPES.LOGOUT_FAILURE, payload: error });
    }
};