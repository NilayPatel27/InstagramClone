import TYPES from "@instagram/context/appContext/types";
import { useAccess } from "@instagram/customHooks/useAccess";

export const loginRequest = (dispatch: any) => async (response: any) => {
    try {
        const newAuthState = await response.json();
        await useAccess("instagram", JSON.stringify({
            accessToken: newAuthState?.accessToken
        }));
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload: newAuthState });
    } catch (error) {
        dispatch({ type: TYPES.LOGIN_FAILURE, payload: error });
    }
};