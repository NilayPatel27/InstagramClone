import TYPES from "@instagram/context/appContext/types";
import { setAccess } from "@instagram/customHooks/useAccess/index.tsx";
import { GET, POST, FORMDATA_POST, DELETE, FORMDATA_PUT, PUT } from "@instagram/context/appContext/apiManagement/index.tsx";

const LOGINURL = 'http://localhost:5000/login';

export const loginRequest = (dispatch: any) => async (params: any) => {
    try {
        const loginResponse: any = await POST('http://10.0.0.105:5000/login', params, {});
        if (loginResponse && loginResponse?.status === 200) {
            await setAccess("userToken", JSON.stringify(loginResponse?.data?.token));
            await setAccess("user", JSON.stringify(loginResponse?.data));
            dispatch({ type: TYPES.LOGIN_SUCCESS, payload: loginResponse });
        } else {
            dispatch({ type: TYPES.LOGIN_FAILURE, payload: loginResponse });
        }
    } catch (error) {
        dispatch({ type: TYPES.LOGIN_FAILURE, payload: error });
    }
};

export const logOutRequest = (dispatch: any) => async () => {
    try {
        const response = await GET(LOGINURL, {});
        __DEV__ && console.log("LogOut", response);
        await setAccess("userToken", "");
        await setAccess("user", "");
        dispatch({ type: TYPES.LOGOUT_SUCCESS, payload: {} });
    } catch (error) {
        dispatch({ type: TYPES.LOGOUT_FAILURE, payload: error });
    }
};

export const userNameExistRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST('http://10.0.0.105:5000/usernameexist', params, {});
        dispatch({ type: TYPES.USERNAMEEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.USERNAMEEXIST_FAILURE, payload: error });
    }
}

export const userEmailExistRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST('http://10.0.0.105:5000/useremailexist', params, {});
        dispatch({ type: TYPES.USEREMAILEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.USEREMAILEXIST_FAILURE, payload: error });
    }
}

export const signUpRequest = (dispatch: any) => async (params: any) => {
    try {
        const signupResponse = await POST('http://10.0.0.105:5000/signup', params, {});
        await setAccess("userToken", JSON.stringify(signupResponse?.data?.token));
        await setAccess("user", JSON.stringify(signupResponse?.data));
        dispatch({ type: TYPES.SIGNUP_SUCCESS, payload: signupResponse });
        return signupResponse;
    } catch (error) {
        dispatch({ type: TYPES.SIGNUP_FAILURE, payload: error });
    }
}

//#region ImageUpload
export const documentUploadRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await FORMDATA_POST('http://10.0.0.105:5000/addposts', params, {});
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
        const response = await GET('http://10.0.0.105:5000/allposts', {});
        dispatch({ type: TYPES.FEEDLIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.FEEDLIST_FAILURE, payload: error });
    }
}
//#endregion

//#region deleteUserAccount
export const deleteUserAccountRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await DELETE(`http://10.0.0.105:5000/deleteaccount/${params}`);
        dispatch({ type: TYPES.DELETEUSERACCOUNT_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.DELETEUSERACCOUNT_FAILURE, payload: error });
    }
}
//#endregion

//#region deleteUserFeed
export const deleteUserFeedRequest = (dispatch: any) => async ({ feedId, userId }: any) => {
    try {
        const response = await DELETE(`http://10.0.0.105:5000/deletepost/${feedId}`, { userId: userId });
        dispatch({ type: TYPES.DELETEUSERFEED_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.DELETEUSERFEED_FAILURE, payload: error });
    }
}
//#endregion

//#region allUsers
export const allUsersRequest = (dispatch: any) => async () => {
    try {
        const response = await GET('http://10.0.0.105:5000/alluserslist', {});
        dispatch({ type: TYPES.ALLUSERS_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.ALLUSERS_FAILURE, payload: error });
    }
}
//#endregion

//#region getUserDetails
export const getUserDetails = (dispatch: any) => async (params: any) => {
    try {
        const response = await GET(`http://10.0.0.105:5000/user/${params.userId}`, {});
        dispatch({ type: TYPES.GETUSERDETAILS_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.GETUSERDETAILS_FAILURE, payload: error });
    }
}
//#endregion

//#region updateUserDetails
export const updateUserDetails = (dispatch: any) => async (params: any) => {
    try {
        const response = await FORMDATA_PUT('http://10.0.0.105:5000/updateprofile', params, {});
        dispatch({ type: TYPES.UPDATEUSERDETAILS_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.UPDATEUSERDETAILS_FAILURE, payload: error });
    }
}
//#endregion

//#region followUser
export const followUser = (dispatch: any) => async (params: any) => {
    try {
        const response = await PUT('http://10.0.0.105:5000/follow', params, {});
        dispatch({ type: TYPES.FOLLOWUSER_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.FOLLOWUSER_FAILURE, payload: error });
    }
}
//#endregion

//#region unFollowUser
export const unFollowUser = (dispatch: any) => async (params: any) => {
    try {
        const response = await PUT('http://10.0.0.105:5000/unfollow', params, {});
        dispatch({ type: TYPES.UNFOLLOWUSER_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.UNFOLLOWUSER_FAILURE, payload: error });
    }
}
//#endregion