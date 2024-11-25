import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useFollowUser = () => {

    const { state: AppState, followUser } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [followUserLoading, setFollowUserLoading] = useState(false);

    useEffect(() => {
        if (followUserLoading && AppState?.Auth?.followUserSuccess === true && AppState?.Auth?.followUserResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setFollowUserLoading(false);
                if (AppState?.Auth?.followUserResponse?.status === "Success" || AppState?.Auth?.followUserResponse?.status === 200) {
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.followUserResponse?.message ? AppState?.Auth?.followUserResponse?.message : "Something went wrong",
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
        } else if (followUserLoading && AppState?.Auth && AppState?.Auth?.followUserSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setFollowUserLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [followUserLoading, AppState?.Auth?.followUserSuccess, AppState?.Auth?.followUserResponse, AppState?.Auth?.error]);


    const followUserRequest = async (params: any) => {
        setFollowUserLoading(true);
        const res = await followUser(params);
        return res?.status;
    }

    return { followUserRequest, followUserLoading };
};

export default useFollowUser;