import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Image, useWindowDimensions } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const MultiFeedTemplate = ({ imageList, feedId }: any) => {
    const { width: windowWidth } = useWindowDimensions();
    const { deleteFeed, deleteUserFeedLoading } = useDeleteFeed();

    const [indexOfPost, setIndexOfPost] = useState(0);

    const scrollX: any = useRef(new Animated.Value(0)).current;

    const onViewRef = useRef((viewableItems: any) => {
        setIndexOfPost(viewableItems?.viewableItems[0]?.index);
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const { userData } = useUserData();

    const onDeletePress = () => {
        deleteFeed({ feedId, userId: userData?.user?._id });
    }

    useEffect(() => {
        return () => {
            scrollX?.current?.scrollToIndex({ animated: true, index: 0 });
            scrollX?.removeAllListeners();
        };
    }, []);

    const renderItem = (item: any, index: any) => {
        return (
            <>

                <View style={{
                    aspectRatio: 1, width: windowWidth, backgroundColor: "white", marginBottom: 10
                }}>
                    <Image
                        source={{ uri: item }}
                        resizeMode="contain"
                        style={{ width: windowWidth, aspectRatio: 1, marginVertical: 5 }}
                    />
                </View>
            </>
        );
    }
    return (
        <>
            <PostHeader userName={userData?.user?.name ? userData?.user?.name : "User Name"} profileUri={""} options={false} onDeletePress={onDeletePress} />
            <View>
                <Animated.FlatList
                    ref={scrollX}
                    data={imageList ? imageList : []}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    renderItem={({ item: image, index }: any) => renderItem(image, index)}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    viewabilityConfig={viewConfigRef?.current}
                    onViewableItemsChanged={onViewRef?.current}
                    getItemLayout={(_, index) => ({ length: windowWidth, offset: windowWidth * index, index })}

                />
                <View style={{
                    position: "absolute", backgroundColor: "#2d333aCC", borderRadius: 10, padding: 5, top: 10, right: 10
                }}>
                    <Text style={{ color: "white", fontWeight: 'bold' }}>{indexOfPost + 1}/{imageList?.length}</Text>
                </View>
            </View>
            <Loader visible={deleteUserFeedLoading} />
        </>
    )
}

export default MultiFeedTemplate;