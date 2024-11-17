import React from 'react';
import { View, useWindowDimensions, Image } from 'react-native';

import { useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const OneFeedTemplate = ({ image }: any) => {
    const { width: windowWidth } = useWindowDimensions();

    const { userData } = useUserData();
    return (
        <>
            <PostHeader userName={userData?.user?.name ? userData?.user?.name : "User Name"} profileUri={""} options={false} />
            <View style={{
                justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "white", marginBottom: 10
            }}>
                <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={{ width: windowWidth, aspectRatio: 1, marginVertical: 5 }}
                />
            </View>
        </>
    )
}

export default OneFeedTemplate;