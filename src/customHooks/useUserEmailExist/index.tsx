import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useUserEmailExist = ({ handleSignUp }: { handleSignUp: () => Promise<any> }) => {

    const { state: AppState, userEmailExistRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [validateEmailLoading, setValidateEmailLoading] = useState<boolean>(false);

    useEffect(() => {
        if (validateEmailLoading && AppState?.Auth && AppState?.Auth?.userEmailExistSuccess === true && AppState?.Auth?.userEmailExistResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setValidateEmailLoading(false);
                if (AppState?.Auth?.userEmailExistResponse?.data?.message === "User not exist" && AppState?.Auth?.userEmailExistResponse?.status === 200) {
                    handleSignUp();
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.userEmailExistResponse?.data?.message ? AppState?.Auth?.userEmailExistResponse?.data?.message : "Something went wrong",
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
        } else if (validateEmailLoading && AppState?.Auth && AppState?.Auth?.userEmailExistSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setValidateEmailLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [validateEmailLoading, AppState?.Auth?.userEmailExistSuccess, AppState?.Auth?.userEmailExistResponse, AppState?.Auth?.error]);

    const userEmailExist = async (params: any) => {
        setValidateEmailLoading(true);
        await userEmailExistRequest(params);
    }

    return { userEmailExist, validateEmailLoading };
};

export default useUserEmailExist;