import React from 'react';
import { View, useWindowDimensions, Image } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const OneFeedTemplate = ({ image, feedId, onDeletePress, deleteUserFeedLoading, userName }: any) => {

    const { width: windowWidth } = useWindowDimensions();

    return (
        <>
            <PostHeader userName={userName} profileUri={""} options={false} feedId={feedId} onDeletePress={() => onDeletePress({ feedId })} />
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