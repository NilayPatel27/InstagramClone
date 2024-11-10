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
        DEV && console.log("LogOut", response);
        await useAccess("userToken", "");
        dispatch({ type: TYPES.LOGOUT_SUCCESS, payload: {} });
    } catch (error) {
        dispatch({ type: TYPES.LOGOUT_FAILURE, payload: error });
    }
};

export const userNameExistRequest = (dispatch: any) => async (params: any) => {
    console.log("userNameExist", params);
    try {
        const response = await POST('http://192.168.2.52:5000/usernameexist', params, {});
        console.log("userNameExist", response);
        dispatch({ type: TYPES.USERNAMEEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.log("userNameExist", error);
        dispatch({ type: TYPES.USERNAMEEXIST_FAILURE, payload: error });
    }
}

export const userEmailExistRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST('http://192.168.2.52:5000/useremailexist', params, {});
        console.log("userEmailExist", response);
        dispatch({ type: TYPES.USEREMAILEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.log("userEmailExist", error);
        dispatch({ type: TYPES.USEREMAILEXIST_FAILURE, payload: error });
    }
}

export const signUpRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST('http://192.168.2.52:5000/signup', params, {});
        console.log("signUp", response);
        dispatch({ type: TYPES.SIGNUP_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.log("signUp", error);
        dispatch({ type: TYPES.SIGNUP_FAILURE, payload: error });
    }
}