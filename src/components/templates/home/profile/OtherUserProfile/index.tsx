import { Divider } from '@rneui/base';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, TouchableHighlight, Dimensions, ActivityIndicator } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import useFollowUser from '@instagram/customHooks/useFollowUser';
import { useFeedsList, useGetUserDetails, useUserData } from '@instagram/customHooks';

const OtherUserProfileTemplate = ({ otherUserId }: { otherUserId: string }) => {

    const { userData } = useUserData();
    const navigation = useNavigation();

    const [followed, setFollowed] = useState(false);
    const [otherUserBio, setOtherUserBio] = useState("");
    const [otherUserName, setOtherUserName] = useState("");
    const [otherUserFullName, setOtherUserFullName] = useState("");
    const [otherUserProfileImage, setOtherUserProfileImage] = useState("");

    const { followUserRequest, followUserLoading } = useFollowUser();
    const { getFeedsList, userFeedListLoading, userFeedList } = useFeedsList();
    const { userDetails: otherUserDetails, getUserDetail: getOtherUserDetail, getUserDetailsLoading: getOtherUserDetalsLoading }: any = useGetUserDetails();
    const { userDetails: currentUserDetails, getUserDetail: getCurrentUserDetail, getUserDetailsLoading: getCurrentUserDetalsLoading }: any = useGetUserDetails();

    const screenWidth = Dimensions.get('window').width;
    const postSize = screenWidth / 3 - 2;

    useFocusEffect(
        React.useCallback(() => {
            getFeedsList();
            return () => {
            };
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (userData?.user?._id)
                getCurrentUserDetail({ userId: userData?.user?._id });
            return () => {
            };
        }, [userData])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (otherUserId)
                getOtherUserDetail({ userId: otherUserId });
            return () => {
            };
        }, [otherUserId])
    );

    useEffect(() => {
        if (otherUserDetails) {
            const { profileImage, name, userName, bio } = otherUserDetails;
            profileImage && setOtherUserProfileImage(profileImage);
            name && setOtherUserFullName(name);
            userName && setOtherUserName(userName);
            bio && setOtherUserBio(bio);
        }
    }, [otherUserDetails]);

    useEffect(() => {
        if (currentUserDetails?.following?.includes(otherUserId)) {
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }, [currentUserDetails]);

    const onBack = () => {
        navigation.goBack();
    }

    const onFollowUnfollowPress = async () => {
        const params = {
            "followId": otherUserId,
            "user": {
                "_id": currentUserDetails?._id
            }
        }
        const response = await followUserRequest(params);
        if (response === 200) {
            getOtherUserDetail({ userId: otherUserId });
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }

    const refRBSheet: any = useRef();

    const handleContact = () => {
        refRBSheet?.current?.open();
    };

    const renderItem = (item: any, index: any) => {
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate("FeedsList")}
                underlayColor="white"
            >
                <View style={{
                    margin: 1,
                    width: postSize,
                    height: postSize,
                }}>
                    {item.feeds.length > 1 &&
                        <Foundation
                            name="page-multiple"
                            size={25}
                            color={'white'}
                            style={styles.multiFeedIcon}
                        />
                    }
                    <Image source={{ uri: item.feeds[0] }} style={styles.postImage} />
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <NavigationBar rightProps={{ back: true, right: false, onBack }} navigation={navigation} userName={otherUserName} />

                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        {
                            otherUserProfileImage ?
                                <Image source={{ uri: otherUserProfileImage }} style={styles.userImage} /> :
                                <Image source={Images.User} style={styles.userImage} />
                        }
                    </View>

                    <View style={styles.countContainer}>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{userFeedList ? userFeedList.length : 0}</Text>
                            <Text style={styles.statLabel}>posts</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{otherUserDetails?.followers?.length}</Text>
                            <Text style={styles.statLabel}>followers</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{otherUserDetails?.following?.length}</Text>
                            <Text style={styles.statLabel}>following</Text>
                        </View>

                    </View>

                </View >

                {
                    (otherUserFullName || otherUserBio) &&
                    <View style={styles.profileDescription}>
                        {
                            otherUserFullName &&
                            <Text style={styles.name}>{otherUserFullName}</Text>
                        }
                        {
                            otherUserBio &&
                            <Text style={styles.description}>{otherUserBio}</Text>
                        }
                    </View>
                }

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={[styles.editButton, { backgroundColor: followed ? '#D3D3D3' : '#1E90FF' }]} onPress={onFollowUnfollowPress}>
                        {
                            followUserLoading ?
                                <ActivityIndicator
                                    animating={followUserLoading}
                                    color='#999999'
                                    size="small" /> :
                                <Text style={[styles.followUnfollowText, { color: followed ? 'black' : 'white' }]}>{followed ? "Unfollow" : "Follow"}</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
                        <Text style={styles.buttonText}>Contact</Text>
                    </TouchableOpacity>

                </View>
                <Divider />

                {
                    userFeedList.length > 0 &&

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                    }}>
                        <FlatList
                            data={userFeedList}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ backgroundColor: 'white' }}
                        />
                    </View>
                }

                <RBSheet
                    ref={refRBSheet}
                    draggable={true}
                    closeOnPressBack={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "rgba(0,0,0, 0.3)",
                        },
                        draggableIcon: {
                            backgroundColor: "gray",
                        },
                        container: {
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            backgroundColor: 'white'
                        }
                    }}
                    closeDuration={0}
                    height={200}>

                    <View style={{ backgroundColor: 'white', justifyContent: "space-around" }}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: "center", paddingVertical: 10 }}>Contact</Text>
                        <Divider />

                        <View style={{ justifyContent: 'space-between', padding: 15 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: "bold" }}>Email</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>{userData?.user?.email}</Text>
                        </View>

                    </View>
                </RBSheet>

                <Loader visible={userFeedListLoading || getCurrentUserDetalsLoading || getOtherUserDetalsLoading} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: 'white'
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    statsContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white'
    },
    stat: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    statLabel: {
        fontSize: 14,
        color: 'black'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    profileDescription: {
        padding: 10,
        backgroundColor: 'white'
    },
    description: {
        fontSize: 16,
        color: 'black',
        textAlign: 'justify'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 7,
        backgroundColor: 'white'
    },
    editButton: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5
    },
    contactButton: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5
    },
    buttonText: {
        color: '#000',
        fontWeight: '400'
    },
    followUnfollowText: {
        fontWeight: '400'
    },
    multiFeedIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 5,
        right: 5
    },
    postImage: {
        width: '100%',
        height: '100%'
    }
});

export default OtherUserProfileTemplate;