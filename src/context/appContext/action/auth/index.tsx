import config from "react-native-config";

import TYPES from "@instagram/context/appContext/types";
import { useAccess } from "@instagram/customHooks/useAccess";
import { GET, POST, FORMDATA_POST } from "@instagram/context/appContext/apiManagement/index.tsx";

const { ACCESS_KEY, LOGINURL } = config;

export const loginRequest = (dispatch: any) => async (params: any) => {
    try {
        const loginResponse = await POST('http://192.168.2.52:5000/login', params, {});
        console.log("Login", loginResponse);
        await useAccess("userToken", JSON.stringify(loginResponse?.data?.token));
        await useAccess("user", JSON.stringify(loginResponse?.data));
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

//#region ImageUpload
export const documentUploadRequest = (dispatch: any) => async (params: any) => {
    try {
        console.log("paramsparams", params);
        const response = await FORMDATA_POST('http://192.168.2.52:5000/addposts', params, {});
        console.log("response", response);
        dispatch({ type: TYPES.DOCUMENT_UPLOAD_SUCCESS, payload: response });
        return response;
    }
    catch (err) {
        dispatch({ type: TYPES.DOCUMENT_UPLOAD_FAILURE, payload: err });
    }
}
//#endregion

//#region feedList
export const feedListRequest = (dispatch: any) => async () => {
    try {
        const response = await GET('http://192.168.2.52:5000/allposts', {});
        console.log("feedList", response);
        dispatch({ type: TYPES.FEEDLIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        console.log("feedList", error);
        dispatch({ type: TYPES.FEEDLIST_FAILURE, payload: error });
    }
}

