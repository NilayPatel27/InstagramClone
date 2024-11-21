import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';

const FeedsListTemplate = () => {

    const { deleteFeed, deleteUserFeedLoading, deletFeedSuccess } = useDeleteFeed();

    const { getFeedsList, userFeedListLoading, userFeedList: userFeedsList } = useFeedsList();

    const [firstTime, setFirstTime] = useState(true);

    const { userData } = useUserData();

    const onDeletePress = ({ feedId }: any) => {
        deleteFeed({ feedId, userId: userData?.user?._id });
        setFirstTime(false);
    }

    const navigation = useNavigation();

    const userName = userData?.user?.name || "User Name";

    useEffect(() => {
        getFeedsList();
    }, [deletFeedSuccess]);

    useEffect(() => {
        if (!firstTime && userFeedsList && userFeedsList.length === 0) {
            navigation.goBack();
        }
    }, [userFeedsList, firstTime]);

    const renderFeeds = (item: any, index: any) => {

        const props = {
            feedId: item?._id,
            onDeletePress,
            deleteUserFeedLoading,
            userName
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

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <FlatList
                data={userFeedsList ? userFeedsList : []}
                renderItem={({ item, index }) => renderFeeds(item, index)}
                keyExtractor={(_, index) => index.toString()}
            />
            <Loader visible={userFeedListLoading || deleteUserFeedLoading} />
        </View>
    )
}

export default FeedsListTemplate;