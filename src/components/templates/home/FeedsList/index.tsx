import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';

const FeedsListTemplate = () => {

    const { deleteFeed, deleteUserFeedLoading, deletFeedSuccess } = useDeleteFeed();

    const { getFeedsList, userFeedListLoading, userFeedList: userFeedsList } = useFeedsList();

    const [firstTime, setFirstTime] = useState(true);

    const currentScreen = useNavigationState((state) => {
        const route = state.routes[state.index];
        return route.name;
    });

    const isHomePage = currentScreen === "HomePage";

    const { userData } = useUserData();

    const onDeletePress = ({ feedId }: any) => {
        deleteFeed({ feedId, userId: userData?.user?._id });
        setFirstTime(false);
    }

    const navigation = useNavigation();

    useEffect(() => {
        getFeedsList();
    }, [deletFeedSuccess]);

    useEffect(() => {
        if (!firstTime && userFeedsList && userFeedsList.length === 0 && !isHomePage) {
            navigation.goBack();
        }
    }, [userFeedsList, firstTime]);

    const renderFeeds = (item: any, index: any) => {
        const props = {
            feedId: item?._id,
            onDeletePress,
            deleteUserFeedLoading,
            userName: item?.userName || "User Name",
            userId: item?.userId,
            profileImage: item?.profileImage
        }

        return (
            item.feeds.length > 1
                ? <MultiFeedsTemplate
                    imageList={item.feeds}
                    {...props}
                />
                : <OneFeedTemplate
                    image={item.feeds[0]}
                    {...props}
                />
        )
    }

    const onRefresh = () => {
        getFeedsList();
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <FlatList
                data={userFeedsList ? userFeedsList : []}
                renderItem={({ item, index }) => renderFeeds(item, index)}
                keyExtractor={(_, index) => index.toString()}
                onRefresh={onRefresh}
                refreshing={userFeedListLoading}
            />
            <Loader visible={userFeedListLoading || deleteUserFeedLoading} />
        </View>
    )
}

export default FeedsListTemplate;