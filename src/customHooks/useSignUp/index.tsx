import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useSignUp = () => {

    const navigation = useNavigation();

    const { state: AppState, signUpRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
    const [firstTimeSignUp, setFirstTimeSignUp] = useState<boolean>(false);

    useEffect(() => {
        if (firstTimeSignUp && !AppState?.Loader?.loaderVisible) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "HomeStack" }]
                }));
        }
    }, [firstTimeSignUp, AppState?.Loader?.loaderVisible]);

    useEffect(() => {
        if (signUpLoading && AppState?.Auth && AppState?.Auth?.signUpSuccess === true && AppState?.Auth?.signUpResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setSignUpLoading(false);
                if (AppState?.Auth?.signUpResponse?.status === "Success" || AppState?.Auth?.signUpResponse?.status === 200) {
                    setFirstTimeSignUp(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.signUpResponse?.message ? AppState?.Auth?.signUpResponse?.message : "Something went wrong",
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
        } else if (signUpLoading && AppState?.Auth && AppState?.Auth?.signUpSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setSignUpLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [signUpLoading, AppState?.Auth?.signUpSuccess, AppState?.Auth?.signUpResponse, AppState?.Auth?.error]);

    const signUp = async (params: any) => {
        setSignUpLoading(true);
        await signUpRequest(params);
    }

    return { signUp, signUpLoading };
};

export default useSignUp;