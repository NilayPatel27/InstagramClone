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

        default:
            return state;
    }
}

export default Reducer;