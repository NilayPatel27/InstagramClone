import TYPES from "@instagram/context/appContext/types";
import { setAccess } from "@instagram/customHooks/useAccess/index.tsx";
import { GET, POST, FORMDATA_POST, DELETE, FORMDATA_PUT, PUT } from "@instagram/context/appContext/apiManagement/index.tsx";
import { LOGIN, SIGNUP, USERNAMEEXIST, USEREMAILEXIST, FEEDUPLOAD, FEEDLIST, DELETEACCOUNT, DELETEPOST, ALLUSERSLIST, USERDETAILS, UPDATEPROFILE, FOLLOWUSER, UNFOLLOWUSER } from '@env';

export const loginRequest = (dispatch: any) => async (params: any) => {
    try {
        const loginResponse: any = await POST(LOGIN, params, {});
        if (loginResponse && loginResponse?.status === 200) {
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
        await setAccess("userToken", "");
        await setAccess("user", "");
        dispatch({ type: TYPES.LOGOUT_SUCCESS, payload: {} });
    } catch (error) {
        dispatch({ type: TYPES.LOGOUT_FAILURE, payload: error });
    }
};

export const userNameExistRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST(USERNAMEEXIST, params, {});
        dispatch({ type: TYPES.USERNAMEEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.USERNAMEEXIST_FAILURE, payload: error });
    }
}

export const userEmailExistRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await POST(USEREMAILEXIST, params, {});
        dispatch({ type: TYPES.USEREMAILEXIST_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.USEREMAILEXIST_FAILURE, payload: error });
    }
}

export const signUpRequest = (dispatch: any) => async (params: any) => {
    try {
        const signupResponse = await POST(SIGNUP, params, {});
        await setAccess("userToken", JSON.stringify(signupResponse?.data?.token));
        await setAccess("user", JSON.stringify(signupResponse?.data));
        dispatch({ type: TYPES.SIGNUP_SUCCESS, payload: signupResponse });
        return signupResponse;
    } catch (error) {
        dispatch({ type: TYPES.SIGNUP_FAILURE, payload: error });
    }
}

//#region ImageUpload
export const feedUploadRequest = (dispatch: any) => async (params: any) => {
    try {
        const response = await FORMDATA_POST(FEEDUPLOAD, params, {});
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
        const response = await GET(FEEDLIST, {});
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
        const response = await DELETE(`${DELETEACCOUNT}/${params}`, {});
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
        const response = await DELETE(`${DELETEPOST}/${feedId}`, { userId: userId });
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
        const response = await GET(ALLUSERSLIST, {});
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
        const response = await GET(`${USERDETAILS}/${params.userId}`, {});
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
        const response = await FORMDATA_PUT(UPDATEPROFILE, params, {});
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
        const response = await PUT(FOLLOWUSER, params, {});
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
        const response = await PUT(UNFOLLOWUSER, params, {});
        dispatch({ type: TYPES.UNFOLLOWUSER_SUCCESS, payload: response });
        return response;
    } catch (error) {
        dispatch({ type: TYPES.UNFOLLOWUSER_FAILURE, payload: error });
    }
}
//#endregion