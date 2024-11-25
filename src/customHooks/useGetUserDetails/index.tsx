import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useGetUserDetails = () => {

    const { state: AppState, getUserDetails } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [getUserDetailsLoading, setGetUserDetailsLoading] = useState(false);

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        if (getUserDetailsLoading && AppState?.Auth?.getUserDetailsSuccess === true && AppState?.Auth?.getUserDetailsResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setGetUserDetailsLoading(false);
                if (AppState?.Auth?.getUserDetailsResponse?.status === "Success" || AppState?.Auth?.getUserDetailsResponse?.status === 200) {
                    setUserDetails(AppState?.Auth?.getUserDetailsResponse?.data?.user);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.getUserDetailsResponse?.message ? AppState?.Auth?.getUserDetailsResponse?.message : "Something went wrong",
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
        } else if (getUserDetailsLoading && AppState?.Auth && AppState?.Auth?.getUserDetailsSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setGetUserDetailsLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [getUserDetailsLoading, AppState?.Auth?.getUserDetailsSuccess, AppState?.Auth?.getUserDetailsResponse, AppState?.Auth?.error]);


    const getUserDetail = ({ userId }: { userId: string }) => {
        setGetUserDetailsLoading(true);
        const response = getUserDetails({ userId });
        return response;
    }

    return { userDetails, getUserDetail, getUserDetailsLoading };
};

export default useGetUserDetails;