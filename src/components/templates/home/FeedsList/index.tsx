import React, { useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { View, FlatList, Image, StyleSheet, Text, Dimensions } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import { useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';

const FeedsListTemplate = ({ otherUserId }: { otherUserId: string }) => {

    const { width, height } = Dimensions.get('window');

    const { deleteFeed, deleteUserFeedLoading, deletFeedSuccess } = useDeleteFeed();

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

    const onDeletePress = ({ feedId }: any) => {
        deleteFeed({ feedId, userId: userData?.user?._id });
        setFirstTime(false);
    }

    const navigation = useNavigation();

    useEffect(() => {
        getFeedsList({ otherUserId: otherUserId ? otherUserId : "" });
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
        getFeedsList({ otherUserId: otherUserId ? otherUserId : "" });
    }

    const ListEmptyComponent = () => {
        const remainingHeight = height - headerHeight - tabBarHeight;

        return (
            <>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <Image source={Images.NoPostsImage} style={{ width, height: remainingHeight, resizeMode: "contain" }} />
                    <Text style={{
                        fontSize: 20, fontWeight: "bold", color: "black", position: 'absolute',
                        bottom: 100, textAlign: 'center'
                    }}>No Posts Found</Text>
                </View>
            </>
        )
    }

    const ListHeaderComponent = () => {
        return (
            <>
                <View onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height);
                    setHeightMeasured(true);
                }}>
                    {
                        isHomePage ?
                            <View style={styles.imageContainer}>
                                <Image source={Images.InstagramLogo} style={styles.logoStyle} />
                            </View> :
                            <NavigationBar rightProps={{ onBack: () => navigation.goBack(), back: true, right: false, text: "Posts" }} navigation={navigation} />
                    }

                </View>
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={userFeedsList.length > 0 ? userFeedsList : []}
                renderItem={({ item, index }) => renderFeeds(item, index)}
                keyExtractor={(_, index) => index.toString()}
                onRefresh={onRefresh}
                refreshing={userFeedListLoading}
                ListEmptyComponent={() => hightMeasured && !(userFeedListLoading || deleteUserFeedLoading) && <ListEmptyComponent />}
                ListHeaderComponent={() => <ListHeaderComponent />}
                scrollEnabled={userFeedsList && userFeedsList.length > 0}
            />
            <Loader visible={userFeedListLoading || deleteUserFeedLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    logoStyle: {
        width: '50%',
        height: 50,
        resizeMode: "contain",
        marginLeft: -15
    }
});

export default FeedsListTemplate;