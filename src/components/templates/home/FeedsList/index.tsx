import React, { useCallback, useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View, FlatList, Image, Text, Dimensions, LayoutChangeEvent } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import { createStyles } from '@instagram/components/templates/home/FeedsList/styles';
import { useCustomTheme, useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';
import { FeedItem } from '@instagram/components/templates/home/FeedsList/types';

const FeedsListTemplate = ({ otherUserId }: { otherUserId: string }) => {
    const { theme } = useCustomTheme();

    const styles = createStyles(theme);
    const { width, height } = Dimensions.get('window');

    const { deleteFeed, deleteUserFeedLoading, deleteFeedSuccess } = useDeleteFeed();

    const { getFeedsList, userFeedListLoading, userFeedList: userFeedsList = [] } = useFeedsList();

    const [firstTime, setFirstTime] = useState(true);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [hightMeasured, setHeightMeasured] = useState(false);

    const tabBarHeight = useBottomTabBarHeight();

    const currentScreen = useNavigationState((state) => {
        const route = state.routes[state.index];
        return route.name;
    });

    const isHomePage = currentScreen === "HomePage";

    const { userData } = useUserData();

    const onDeletePress = ({ feedId }: { feedId: string }) => {
        if (!userData?.user?._id) return;
        deleteFeed({ feedId, userId: userData.user._id });
        setFirstTime(false);
    };

    const navigation = useNavigation();

    useEffect(() => {
        getFeedsList({ otherUserId: otherUserId ? otherUserId : "" });
    }, [otherUserId, deleteFeedSuccess]);

    useEffect(() => {
        if (!firstTime && userFeedsList && userFeedsList.length === 0 && !isHomePage) {
            navigation.goBack();
        }
    }, [userFeedsList, firstTime]);

    const renderFeeds = ({ item, index }: { item: FeedItem; index: number }) => {
        const props = {
            feedId: item?._id,
            onDeletePress,
            deleteUserFeedLoading,
            userName: item?.userName,
            userId: item?.userId,
            profileImage: item?.profileImage,
            index
        }

        return item.feeds.length > 1 ? (
            <MultiFeedsTemplate imageList={item.feeds} {...props} />
        ) : (
            <OneFeedTemplate image={item.feeds[0]} {...props} />
        );
    }

    const onRefresh = () => {
        getFeedsList({ otherUserId: otherUserId || "" });
    }

    const ListEmptyComponent = () => {
        if (!hightMeasured || userFeedListLoading || deleteUserFeedLoading) return null;

        const remainingHeight = height - headerHeight - tabBarHeight;

        return (
            <View style={styles.listEmptyComponent}>
                <Image source={Images.NoPostsImage} style={{ width, height: remainingHeight, resizeMode: "contain" }} />
                <Text style={styles.noPostFoundText}>No Posts Found</Text>
            </View>
        )
    }

    const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
        setHeightMeasured(true);
    }, []);

    const ListHeaderComponent = () => {
        return (
            <View onLayout={handleHeaderLayout}>
                {
                    isHomePage ?
                        <View style={styles.imageContainer}>
                            <Image source={Images.InstagramLogo} style={styles.logoStyle} />
                        </View> :
                        <NavigationBar rightProps={{ onBack: () => navigation.goBack(), back: true, right: false, text: "Posts" }} navigation={navigation} />
                }

            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={userFeedsList.length > 0 ? userFeedsList : []}
                renderItem={renderFeeds}
                keyExtractor={(item: FeedItem, index: number) => item._id || index.toString()}
                onRefresh={onRefresh}
                refreshing={userFeedListLoading}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={ListHeaderComponent}
                scrollEnabled={userFeedsList && userFeedsList.length > 0}
            />
            <Loader visible={userFeedListLoading || deleteUserFeedLoading} />
        </View>
    )
}

export default FeedsListTemplate;