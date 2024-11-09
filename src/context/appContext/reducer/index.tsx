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

        default:
            return state;
    }
}

export default Reducer;
