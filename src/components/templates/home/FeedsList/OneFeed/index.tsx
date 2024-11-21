import React from 'react';
import { View, useWindowDimensions, Image } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useDeleteFeed, useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const OneFeedTemplate = ({ image, feedId }: any) => {
    const { width: windowWidth } = useWindowDimensions();
    const { deleteFeed, deleteUserFeedLoading } = useDeleteFeed();

    const { userData } = useUserData();

    const onDeletePress = () => {
        deleteFeed({ feedId, userId: userData?.user?._id });
    }

    return (
        <>
            <PostHeader userName={userData?.user?.name ? userData?.user?.name : "User Name"} profileUri={""} options={false} feedId={feedId} onDeletePress={onDeletePress} />
            <View style={{
                justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "white", marginBottom: 10
            }}>
                <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={{ width: windowWidth, aspectRatio: 1, marginVertical: 5 }}
                />
            </View>
            <Loader visible={deleteUserFeedLoading} />
        </>
    )
}

export default OneFeedTemplate;