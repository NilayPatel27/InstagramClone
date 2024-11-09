import config from "react-native-config";

import TYPES from "@instagram/context/appContext/types";
import { useAccess } from "@instagram/customHooks/useAccess";
import { GET, POST } from "@instagram/context/appContext/apiManagement/index.tsx";

const { ACCESS_KEY, LOGINURL } = config;

export const loginRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST(LOGINURL, params, {});
        await useAccess(ACCESS_KEY, JSON.stringify({
            accessToken: response?.accessToken
        }));
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: TYPES.LOGIN_FAILURE, payload: error });
    }
};

export const logoutRequest = (dispatch: any) => async () => {
    try {
        const response = await GET(LOGINURL, {});
        __DEV__ && console.log("LogOut", response);
        await useAccess(ACCESS_KEY, "");
        dispatch({ type: TYPES.LOGOUT_SUCCESS, payload: {} });
    } catch (error) {
        dispatch({ type: TYPES.LOGOUT_FAILURE, payload: error });
    }
};