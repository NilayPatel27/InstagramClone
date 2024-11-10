import TYPE from "@instagram/context/appContext/types";

const Reducer = (state: any, action: any) => {
    switch (action.type) {
        //#region AUTH
        case TYPE.LOGIN_SUCCESS:
            return { ...state, Auth: { ...state.Auth, loginSuccess: true, loginResponse: action?.payload } };
        case TYPE.LOGIN_FAILURE:
            return { ...state, Auth: { ...state.Auth, loginSuccess: false, error: action?.payload } };

        case TYPE.LOGOUT_SUCCESS:
            return {};
        case TYPE.LOGOUT_FAILURE:
            return state;

        //#region loader
        case TYPE.SET_LOADER_VISIBLE:
            return { ...state, Loader: { ...state.Loader, loaderVisible: action?.payload } };

        default:
            return state;
    }
}

export default Reducer;
