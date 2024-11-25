import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import { useUserData } from "@instagram/customHooks";
import usePrevious from "@instagram/customHooks/usePrevious";
import { useNavigationState } from "@react-navigation/native";

const useFeedsList = () => {

    const { state: AppState, feedListRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [userFeedListLoading, setUserFeedListLoading] = useState(false);
    const [userFeedList, setUserFeedList] = useState([]);

    const { userData } = useUserData();

    const getFeedsList = () => {
        setUserFeedListLoading(true);
        feedListRequest();
    }

    const currentScreen = useNavigationState((state) => {
        const route = state.routes[state.index];
        return route.name;
    });

    useEffect(() => {
        if (userFeedListLoading && AppState?.FeedList && AppState?.FeedList?.feedListSuccess === true && AppState?.FeedList?.feedListResponse) {
            if (previousAppState?.FeedList !== AppState?.FeedList) {
                setUserFeedListLoading(false);
                if (AppState?.FeedList?.feedListResponse?.status === "Success" || AppState?.FeedList?.feedListResponse?.status === 200) {
                    const isHomePage = currentScreen === "HomePage";

                    const filteredFeedList = AppState?.FeedList?.feedListResponse?.data?.posts?.filter(
                        (item: any) => isHomePage || item.userId === userData?.user?._id
                    );

                    setUserFeedList(filteredFeedList);

                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.FeedList?.feedListResponse?.message ? AppState?.FeedList?.feedListResponse?.message : "Something went wrong",
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
        } else if (userFeedListLoading && AppState?.FeedList && AppState?.FeedList?.feedListSuccess === false && AppState?.FeedList?.error) {
            if (previousAppState?.FeedList !== AppState?.FeedList) {
                setUserFeedListLoading(false);
                if (AppState?.FeedList?.error && AppState?.FeedList?.error?.code && AppState?.FeedList?.error?.code === 401) {
                    Alert.alert("", AppState?.FeedList?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.FeedList?.error?.error)
                }
            }
        }
    }, [userFeedListLoading, AppState?.FeedList?.feedListSuccess, AppState?.FeedList?.feedListResponse, AppState?.FeedList?.error]);

    return { getFeedsList, userFeedListLoading, userFeedList };
};

export default useFeedsList;