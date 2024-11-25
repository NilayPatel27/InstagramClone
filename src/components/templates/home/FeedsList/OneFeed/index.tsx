import React from 'react';
import { View, useWindowDimensions, Image } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const OneFeedTemplate = ({ image, feedId, onDeletePress, deleteUserFeedLoading, userName, userId, profileImage }: any) => {

    const { width: windowWidth } = useWindowDimensions();

    const { userData } = useUserData();

    const options = userData?.user?._id === userId;

    return (
        <>
            <PostHeader userName={userName} profileUri={profileImage} options={options} feedId={feedId} onDeletePress={() => onDeletePress({ feedId })} />
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