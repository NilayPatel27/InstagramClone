import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, useWindowDimensions } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useGetUserDetails, useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const PreviewPostsHeader = () => {

    const { userData } = useUserData();
    const { userDetails, getUserDetail, getUserDetailsLoading }: any = useGetUserDetails();

    const [userName, setUserName] = useState("");
    const [userProfileImage, setUserProfileImage] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            if (userData?.user?._id)
                getUserDetail({ userId: userData?.user?._id });
            return () => {
            };
        }, [userData])
    );

    useEffect(() => {
        if (userDetails) {
            const { profileImage, userName } = userDetails;
            profileImage && setUserProfileImage(profileImage);
            userName && setUserName(userName);
        }
    }, [userDetails]);

    let { width: windowWidth } = useWindowDimensions();

    return (
        <>
            <Text style={{ color: 'black', padding: 10, textAlign: "center" }}>-: Preview :-</Text>
            <View style={{ width: windowWidth, backgroundColor: '#fff' }}>
                <PostHeader userName={userName} profileUri={userProfileImage} options={false} />
            </View>
            <Loader visible={getUserDetailsLoading} />
        </>
    )
}

export default PreviewPostsHeader