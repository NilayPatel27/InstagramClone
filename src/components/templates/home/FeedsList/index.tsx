import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useFeedsList, useUserData } from '@instagram/customHooks';
import { OneFeedTemplate, MultiFeedsTemplate } from '@instagram/components/templates/home/index.tsx';
import { NavigationBar } from '@instagram/components/molecules';

const FeedsListTemplate = ({ otherUserId }: { otherUserId: string }) => {

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

    return (
        <>
            {
                isHomePage ?
                    <View style={styles.imageContainer}>
                        <Image source={Images.InstagramLogo} style={styles.logoStyle} />
                    </View> :
                    <NavigationBar rightProps={{ onBack: () => navigation.goBack(), back: true, right: false, text: "Posts" }} navigation={navigation} />
            }
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
        </>
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