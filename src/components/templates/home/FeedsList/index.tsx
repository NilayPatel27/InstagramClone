import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';

const FeedsListTemplate = ({ index }: any) => {

    const { deleteFeed, deleteUserFeedLoading, deletFeedSuccess } = useDeleteFeed();

    const { getFeedsList, userFeedListLoading, userFeedList: userFeedsList } = useFeedsList();

    const { userData } = useUserData();

    const onDeletePress = ({ feedId }: any) => {
        deleteFeed({ feedId, userId: userData?.user?._id });
    }

    const userName = userData?.user?.name ? userData?.user?.name : "User Name";

    useEffect(() => {
        getFeedsList();
    }, []);

    useEffect(() => {
        if (deletFeedSuccess)
            getFeedsList();
    }, [deletFeedSuccess]);

    const renderFeeds = (item: any, index: any) => {
        return (
            item.feeds.length > 1
                ? <MultiFeedsTemplate imageList={item.feeds} feedId={item?._id} onDeletePress={onDeletePress} deleteUserFeedLoading={deleteUserFeedLoading} userName={userName} />
                : <OneFeedTemplate image={item.feeds[0]} feedId={item?._id} onDeletePress={onDeletePress} deleteUserFeedLoading={deleteUserFeedLoading} userName={userName} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <FlatList
                data={userFeedsList ? userFeedsList : []}
                renderItem={({ item }) => renderFeeds(item, index)}
                keyExtractor={(_, index) => index.toString()}
            />
            <Loader visible={userFeedListLoading} />
        </View>
    )
}

export default FeedsListTemplate;