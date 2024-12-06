import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useUserLogin = () => {

    const { state: AppState, loginRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [loginLoading, setLoginLoading] = useState(false);
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        if (loginLoading && AppState?.Auth && AppState?.Auth?.loginSuccess === true && AppState?.Auth?.loginResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setLoginLoading(false);
                if (AppState?.Auth?.loginResponse?.status === "Success" || AppState?.Auth?.loginResponse?.status === 200) {
                    setFirstTimeLogin(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.loginResponse?.message ? AppState?.Auth?.loginResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
        } else if (loginLoading && AppState?.Auth && AppState?.Auth?.loginSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setLoginLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert("", AppState?.Auth?.error?.error, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }, // Optional button
                    ],
                        { cancelable: true })
                }
            }
        }
    }, [loginLoading, AppState?.Auth?.loginSuccess, AppState?.Auth?.loginResponse, AppState?.Auth?.error]);

    const userLogin = async (params: any) => {
        setLoginLoading(true);
        await loginRequest(params);
    }

    return { userLogin, loginLoading, firstTimeLogin };
};

export default useUserLogin;