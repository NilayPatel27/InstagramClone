import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useUpdateUserDetails = () => {

    const { state: AppState, updateUserDetails } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [updateUserDetailsLoading, setUpdateUserDetailsLoading] = useState(false);

    useEffect(() => {
        if (updateUserDetailsLoading && AppState?.Auth?.updateUserDetailsSuccess === true && AppState?.Auth?.updateUserDetailsResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUpdateUserDetailsLoading(false);
                if (AppState?.Auth?.updateUserDetailsResponse?.status === "Success" || AppState?.Auth?.updateUserDetailsResponse?.status === 200) {
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.updateUserDetailsResponse?.message ? AppState?.Auth?.updateUserDetailsResponse?.message : "Something went wrong",
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
        } else if (updateUserDetailsLoading && AppState?.Auth && AppState?.Auth?.updateUserDetailsSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUpdateUserDetailsLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [updateUserDetailsLoading, AppState?.Auth?.updateUserDetailsSuccess, AppState?.Auth?.updateUserDetailsResponse, AppState?.Auth?.error]);


    const updateUserDetail = async (params: any) => {
        setUpdateUserDetailsLoading(true);
        const res = await updateUserDetails(params);
        return res.status;
    }

    return { updateUserDetail, updateUserDetailsLoading };
};

export default useUpdateUserDetails;