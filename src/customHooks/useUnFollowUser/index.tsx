import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useUnFollowUser = () => {

    const { state: AppState, unFollowUser } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [unFollowUserLoading, setUnFollowUserLoading] = useState(false);

    useEffect(() => {
        if (unFollowUserLoading && AppState?.Auth?.unFollowUserSuccess === true && AppState?.Auth?.unFollowUserResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUnFollowUserLoading(false);
                if (AppState?.Auth?.unFollowUserResponse?.status === "Success" || AppState?.Auth?.unFollowUserResponse?.status === 200) {
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.unFollowUserResponse?.message ? AppState?.Auth?.unFollowUserResponse?.message : "Something went wrong",
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
        } else if (unFollowUserLoading && AppState?.Auth && AppState?.Auth?.unFollowUserSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUnFollowUserLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [unFollowUserLoading, AppState?.Auth?.unFollowUserSuccess, AppState?.Auth?.unFollowUserResponse, AppState?.Auth?.error]);

    const unFollowUserRequest = async (params: any) => {
        setUnFollowUserLoading(true);
        const res = await unFollowUser(params);
        return res?.status;
    }

    return { unFollowUserRequest, unFollowUserLoading };
};

export default useUnFollowUser;