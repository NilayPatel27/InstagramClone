import TYPES from "@instagram/context/appContext/types";

//#region Loader
export const setLoader = (dispatch: any) => (param: any) => {
    dispatch({ type: TYPES.SET_LOADER_VISIBLE, payload: param });
};