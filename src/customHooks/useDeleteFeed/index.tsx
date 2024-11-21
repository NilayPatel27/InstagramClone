import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useDeleteFeed = () => {

    const { state: AppState, deleteUserFeedRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [deleteUserFeedLoading, setDeleteUserFeedLoading] = useState(false);

    const [deletFeedSuccess, setDeletFeedSuccess] = useState(false);

    useEffect(() => {
        if (deleteUserFeedLoading && AppState?.Auth?.deleteUserFeedSuccess === true && AppState?.Auth?.deleteUserFeedResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserFeedLoading(false);
                if (AppState?.Auth?.deleteUserFeedResponse?.status === "Success" || AppState?.Auth?.deleteUserFeedResponse?.status === 200) {
                    setDeletFeedSuccess(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.deleteUserFeedResponse?.message ? AppState?.Auth?.deleteUserFeedResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                    setDeletFeedSuccess(false);
                }
            }
        } else if (deleteUserFeedLoading && AppState?.Auth && AppState?.Auth?.deleteUserFeedSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserFeedLoading(false);
                setDeletFeedSuccess(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [deleteUserFeedLoading, AppState?.Auth?.deleteUserFeedSuccess, AppState?.Auth?.deleteUserFeedResponse, AppState?.Auth?.error]);


    const deleteFeed = ({ feedId, userId }: any) => {
        setDeleteUserFeedLoading(true);
        deleteUserFeedRequest({ feedId, userId });
    }

    return { deleteFeed, deleteUserFeedLoading, deletFeedSuccess };
};

export default useDeleteFeed;