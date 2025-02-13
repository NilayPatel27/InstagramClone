import { Divider } from '@rneui/base';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, TouchableHighlight, Dimensions, ActivityIndicator } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import { useFollowUser, useUnFollowUser } from '@instagram/customHooks';
import { useFeedsList, useGetUserDetails, useUserData } from '@instagram/customHooks';

const OtherUserProfileTemplate = ({ otherUserId }: { otherUserId: string }) => {

    const { userData } = useUserData();
    const navigation = useNavigation();

    const [followed, setFollowed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [otherUserBio, setOtherUserBio] = useState("");
    const [otherUserName, setOtherUserName] = useState("");
    const [hightMeasured, setHeightMeasured] = useState(false);
    const [otherUserFullName, setOtherUserFullName] = useState("");
    const [otherUserDetails, setOtherUserDetails] = useState<any>({});
    const [currentUserDetails, setCurrentUserDetails] = useState<any>({});
    const [otherUserProfileImage, setOtherUserProfileImage] = useState("");

    const { followUserRequest, followUserLoading } = useFollowUser();
    const { unFollowUserRequest, unFollowUserLoading } = useUnFollowUser();
    const { getFeedsList, userFeedListLoading, userFeedList } = useFeedsList();
    const { getUserDetail: getOtherUserDetail, getUserDetailsLoading: getOtherUserDetalsLoading }: any = useGetUserDetails();
    const { getUserDetail: getCurrentUserDetail, getUserDetailsLoading: getCurrentUserDetalsLoading }: any = useGetUserDetails();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const tabBarHeight = useBottomTabBarHeight();

    const postSize = screenWidth / 3 - 2;

    useFocusEffect(
        React.useCallback(() => {
            getFeedsList({ otherUserId });
            return () => {
            };
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (userData?.user?._id) {
                const getDetail = async () => {
                    const response = await getCurrentUserDetail({ userId: userData?.user?._id });
                    if (response.status === 200)
                        setCurrentUserDetails(response.data.user);
                    else {
                        setCurrentUserDetails({});
                    }
                }
                getDetail();
            }

            return () => {
            };
        }, [userData?.user?._id])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (otherUserId) {
                const getDetail = async () => {
                    const response = await getOtherUserDetail({ userId: otherUserId });
                    if (response.status === 200)
                        setOtherUserDetails(response.data.user);
                    else {
                        setOtherUserDetails({});
                    }
                }
                getDetail();
            }
            return () => {
            };
        }, [otherUserId])
    );

    useEffect(() => {
        if (otherUserDetails) {
            const { profileImage, name, userName, bio }: any = otherUserDetails;
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
        if (followed) {
            const params = {
                "unfollowId": otherUserId,
                "user": {
                    "_id": currentUserDetails?._id
                }
            }
            const response = await unFollowUserRequest(params);
            if (response === 200) {
                const getDetail = async () => {
                    const res = await getOtherUserDetail({ userId: otherUserId });
                    if (res.status === 200)
                        setOtherUserDetails(res.data.user);
                    else {
                        setOtherUserDetails({});
                    }
                }
                getDetail();
                setFollowed(false);
            } else {
                setFollowed(true);
            }
        } else {
            const params = {
                "followId": otherUserId,
                "user": {
                    "_id": currentUserDetails?._id
                }
            }
            const response = await followUserRequest(params);
            if (response === 200) {
                const getDetail = async () => {
                    const res = await getOtherUserDetail({ userId: otherUserId });
                    if (res.status === 200)
                        setOtherUserDetails(res.data.user);
                    else {
                        setOtherUserDetails({});
                    }
                }
                getDetail();
                setFollowed(true);
            } else {
                setFollowed(false);
            }
        }
    }

    const refRBSheet: any = useRef();

    const handleContact = () => {
        refRBSheet?.current?.open();
    };

    const renderItem = (item: any, index: any) => {
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate("FeedsList", { otherUserId })}
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

    const ListEmptyComponent = () => {
        const remainingHeight = screenHeight - headerHeight - tabBarHeight;
        return (
            <>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <Image source={Images.NoPostsImage} style={{ width: screenWidth, flex: 1, height: remainingHeight, resizeMode: "contain", backgroundColor: "white" }} />
                    <Text style={{
                        fontSize: 20, fontWeight: "bold", color: "black", position: 'absolute',
                        bottom: 40, textAlign: 'center'
                    }}>No Posts Found</Text>
                </View>
            </>
        )
    }

    const onFriendsListPress = (keyword: string) => {
        if ((keyword === "followers" && !otherUserDetails?.followers?.length) || (keyword === "following" && !otherUserDetails?.following?.length)) {
            return;
        }

        navigation.dispatch(StackActions.push("FriendsListPage", { keyword, userId: otherUserId }));
    }

    const ListHeaderComponent = () => {
        return (
            <>
                <View onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height);
                    setHeightMeasured(true);
                }}>
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

                            <TouchableOpacity style={styles.statsContainer} onPress={() => onFriendsListPress("followers")}>
                                <Text style={styles.stat}>{otherUserDetails ? otherUserDetails?.followers?.length : 0}</Text>
                                <Text style={styles.statLabel}>followers</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.statsContainer} onPress={() => onFriendsListPress("following")}>
                                <Text style={styles.stat}>{otherUserDetails ? otherUserDetails?.following?.length : 0}</Text>
                                <Text style={styles.statLabel}>following</Text>
                            </TouchableOpacity>

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
                                (followUserLoading || unFollowUserLoading) ?
                                    <ActivityIndicator
                                        animating={followUserLoading || unFollowUserLoading}
                                        color='#999999'
                                        size="small" /> :
                                    <Text style={[styles.followUnfollowText, { color: followed ? 'black' : 'white' }]}>{followed ? "Unfollow" : "Follow"}</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
                            <Text style={styles.buttonText}>Contact</Text>
                        </TouchableOpacity>

                    </View>
                    <Divider />
                </View>
            </>
        )
    }


    return (
        <>
            <View style={{ flex: 1, backgroundColor: "white" }}>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                }}>
                    <FlatList
                        data={userFeedList.length > 0 ? userFeedList : []}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => renderItem(item, index)}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: 'white' }}
                        ListHeaderComponent={() => <ListHeaderComponent />}
                        ListEmptyComponent={() => hightMeasured && !(userFeedListLoading || getCurrentUserDetalsLoading || getOtherUserDetalsLoading) && <ListEmptyComponent />}
                    />
                </View>
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{otherUserDetails?.email}</Text>
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