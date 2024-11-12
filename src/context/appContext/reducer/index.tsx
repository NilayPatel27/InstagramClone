import TYPE from "@instagram/context/appContext/types";

const Reducer = (state: any, action: any) => {
    switch (action.type) {
        //#region AUTH
        case TYPE.LOGIN_SUCCESS:
            return { ...state, Auth: { ...state.Auth, loginSuccess: true, loginResponse: action?.payload } };
        case TYPE.LOGIN_FAILURE:
            return { ...state, Auth: { ...state.Auth, loginSuccess: false, error: action?.payload } };

        case TYPE.SIGNUP_SUCCESS:
            return { ...state, Auth: { ...state.Auth, signUpSuccess: true, signUpResponse: action?.payload } };
        case TYPE.SIGNUP_FAILURE:
            return { ...state, Auth: { ...state.Auth, signUpSuccess: false, error: action?.payload } };

        case TYPE.LOGOUT_SUCCESS:
            return {};
        case TYPE.LOGOUT_FAILURE:
            return state;

        //#region loader
        case TYPE.SET_LOADER_VISIBLE:
            return { ...state, Loader: { ...state.Loader, loaderVisible: action?.payload } };

        //#region USERNAMEEXIST
        case TYPE.USERNAMEEXIST_SUCCESS:
            return { ...state, Auth: { ...state.Auth, userNameExistSuccess: true, userNameExistResponse: action?.payload } };
        case TYPE.USERNAMEEXIST_FAILURE:
            return { ...state, Auth: { ...state.Auth, userNameExistSuccess: false, error: action?.payload } };

        //#region USEREMAILEXIST
        case TYPE.USEREMAILEXIST_SUCCESS:
            return { ...state, Auth: { ...state.Auth, userEmailExistSuccess: true, userEmailExistResponse: action?.payload } };
        case TYPE.USEREMAILEXIST_FAILURE:
            return { ...state, Auth: { ...state.Auth, userEmailExistSuccess: false, error: action?.payload } };

        //#region DocumentUpload
        case TYPE.DOCUMENT_UPLOAD_SUCCESS:
            return { ...state, DocumentUpload: { ...state.DocumentUpload, documentUploadSuccess: true, documentUploadResponse: action.payload } };
        case TYPE.DOCUMENT_UPLOAD_FAILURE:
            return { ...state, DocumentUpload: { ...state.DocumentUpload, documentUploadSuccess: false, error: action.payload } };
        //#endregion

        //#region FeedList
        case TYPE.FEEDLIST_SUCCESS:
            return { ...state, FeedList: { ...state.FeedList, feedListSuccess: true, feedListResponse: action.payload } };
        case TYPE.FEEDLIST_FAILURE:
            return { ...state, FeedList: { ...state.FeedList, feedListSuccess: false, error: action.payload } };

        //#region DeleteUserAccount
        case TYPE.DELETEUSERACCOUNT_SUCCESS:
            return { ...state, Auth: { ...state.Auth, deleteUserAccountSuccess: true, deleteUserAccountResponse: action.payload } };
        case TYPE.DELETEUSERACCOUNT_FAILURE:
            return { ...state, Auth: { ...state.Auth, deleteUserAccountSuccess: false, error: action.payload } };
        //#endregion

        default:
            return state;
    }
}

export default Reducer;