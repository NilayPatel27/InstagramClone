import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Image, useWindowDimensions } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useCustomTheme, useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';
import { createStyles } from '@instagram/components/templates/home/FeedsList/MultiFeeds/styles';
import { MultiFeedTemplateProps } from '@instagram/components/templates/home/FeedsList/MultiFeeds/types';

const MultiFeedTemplate = ({ imageList = [], feedId, onDeletePress, deleteUserFeedLoading, userName, userId, profileImage }: MultiFeedTemplateProps) => {

    const { width: windowWidth } = useWindowDimensions();

    const { theme } = useCustomTheme();
    const styles = createStyles(theme, windowWidth);

    const { userData } = useUserData();

    const [indexOfPost, setIndexOfPost] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<Animated.FlatList<string>>(null);

    const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        setIndexOfPost(viewableItems[0]?.index || 0);
    });

    const options = userData?.user?._id === userId;

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const RenderImage = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: item }}
                resizeMode="contain"
                style={styles.image}
            />
        </View>
    );

    const onScroll = useCallback(
        Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
        ),
        [scrollX]
    );

    return (
        <>
            <PostHeader userName={userName} profileUri={profileImage} options={options} onDeletePress={() => onDeletePress({ feedId })} />
            <View>
                <Animated.FlatList
                    ref={flatListRef}
                    data={imageList}
                    onScroll={onScroll}
                    renderItem={({ item }) => <RenderImage item={item} />}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    viewabilityConfig={viewConfigRef?.current}
                    onViewableItemsChanged={onViewRef?.current}
                    getItemLayout={(_, index) => ({ length: windowWidth, offset: windowWidth * index, index })}

                />
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>{indexOfPost + 1}/{imageList?.length}</Text>
                </View>
            </View>
            <Loader visible={deleteUserFeedLoading} />
        </>
    )
}

export default MultiFeedTemplate;