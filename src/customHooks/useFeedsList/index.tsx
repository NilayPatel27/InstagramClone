import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigationState } from "@react-navigation/native";

import { AppContext } from "@instagram/context";
import { useGetUserDetails, usePrevious, useUserData } from "@instagram/customHooks";

const useFeedsList = () => {

    const { state: AppState, feedListRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [otherUserId, setOtherUserId] = useState("");
    const [userFeedListLoading, setUserFeedListLoading] = useState(false);
    const [currentUserDetails, setCurrentUserDetails] = useState<any>({});
    const [userFeedList, setUserFeedList] = useState([]);

    const { userData } = useUserData();
    const { getUserDetail: getCurrentUserDetail }: any = useGetUserDetails();

    const getDetail = async () => {
        if (userData?.user?._id) {
            const response = await getCurrentUserDetail({ userId: userData?.user?._id });
            if (response.status === 200)
                setCurrentUserDetails(response.data.user);
            else {
                setCurrentUserDetails({});
            }
        }
    }
    useEffect(() => {
        getDetail();
    }, [userData?.user?._id])

    const getFeedsList = async ({ otherUserId }: any) => {
        if (otherUserId)
            setOtherUserId(otherUserId);
        getDetail();
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
                    const isOtherUserProfilePage = currentScreen === "OtherUserProfilePage";
                    const isProfilePage = currentScreen === "ProfilePage";

                    const filteredFeedList = AppState?.FeedList?.feedListResponse?.data?.posts?.filter(
                        (item: any) => {
                            if (isHomePage) {
                                return currentUserDetails?.following?.includes(item.userId) || item.userId === userData.user._id;
                            } else if (isOtherUserProfilePage) {
                                return item.userId === otherUserId;
                            } else if (isProfilePage) {
                                return item.userId === userData.user._id;
                            } else
                                return item.userId === userData.user._id;
                        });
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