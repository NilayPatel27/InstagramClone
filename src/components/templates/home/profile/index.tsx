import { Divider } from '@rneui/base';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules/index.tsx';
import { useFeedsList, useGetUserDetails, useUserData } from '@instagram/customHooks';

const ProfileTemplate = () => {

    const navigation = useNavigation();
    const { userData } = useUserData();
    const { userDetails, getUserDetail, getUserDetailsLoading }: any = useGetUserDetails();

    const { getFeedsList, userFeedListLoading, userFeedList } = useFeedsList();

    const [userProfileImage, setUserProfileImage] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [userBio, setUserBio] = useState("");

    const [headerHeight, setHeaderHeight] = useState(0);
    const [hightMeasured, setHeightMeasured] = useState(false);

    const onPress = () => {
        navigation.navigate("SettingPage");
    }

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const tabBarHeight = useBottomTabBarHeight();
    const postSize = screenWidth / 3 - 2;

    useFocusEffect(
        React.useCallback(() => {
            getFeedsList({ otherUserId: "" });
            return () => {
            };
        }, [userData])
    );

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
            const { profileImage, name, userName, bio } = userDetails;
            profileImage && setUserProfileImage(profileImage);
            name && setUserFullName(name);
            userName && setUserName(userName);
            bio && setUserBio(bio);
        }
    }, [userDetails]);

    const refRBSheet: any = useRef();

    const renderItem = (item: any, index: any) => {
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate("FeedsList", { otherUserId: "" })}
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

    const handleEditProfile = () => {
        navigation.navigate("EditProfile");
    };

    const handleContact = () => {
        refRBSheet?.current?.open();
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
        if ((keyword === "followers" && !userDetails?.followers?.length) || (keyword === "following" && !userDetails?.following?.length)) {
            return;
        }
        navigation.navigate("FriendsListPage", { keyword, userId: userData?.user?._id });
    }

    const ListHeaderComponent = () => {
        return (
            <>
                <View onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height);
                    setHeightMeasured(true);
                }}>
                    <NavigationBar rightProps={{ onPress, back: false, right: true, onBack: false, postButton: true, menuButton: true }} navigation={navigation} userName={userName} />

                    <View style={styles.container}>
                        {
                            userProfileImage ?
                                <Image source={{ uri: userProfileImage }} style={styles.userImage} /> :
                                <Image source={Images.User} style={styles.userImage} />
                        }
                        <View style={styles.countContainer}>

                            <View style={styles.statsContainer}>
                                <Text style={styles.stat}>{userFeedList ? userFeedList?.length : 0}</Text>
                                <Text style={styles.statLabel}>posts</Text>
                            </View>

                            <TouchableOpacity style={styles.statsContainer} onPress={() => onFriendsListPress("followers")}>
                                <Text style={styles.stat}>{userDetails ? userDetails?.followers?.length : 0}</Text>
                                <Text style={styles.statLabel}>followers</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.statsContainer} onPress={() => onFriendsListPress("following")}>
                                <Text style={styles.stat}>{userDetails ? userDetails?.following?.length : 0}</Text>
                                <Text style={styles.statLabel}>following</Text>
                            </TouchableOpacity>

                        </View>
                    </View >
                    {
                        (userFullName || userBio) &&
                        <View style={styles.profileDescription}>
                            {
                                userFullName &&
                                <Text style={styles.name}>{userFullName}</Text>
                            }
                            {
                                userBio &&
                                <Text style={styles.description}>{userBio}</Text>
                            }
                        </View>
                    }
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                            <Text style={styles.buttonText}>Edit profile</Text>
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
            <View style={{
                flex: 1,
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
                    ListEmptyComponent={() => hightMeasured && !(userFeedListLoading || getUserDetailsLoading) && <ListEmptyComponent />}
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
                height={200}
            >
                <View style={{ backgroundColor: 'white', justifyContent: "space-around" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: "center", paddingVertical: 10 }}>Contact</Text>
                    <Divider />
                    <View style={{ justifyContent: 'space-between', padding: 15 }}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: "bold" }}>Email</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>{userDetails?.email}</Text>
                    </View>
                </View>
            </RBSheet>
            <Loader visible={userFeedListLoading || getUserDetailsLoading} />
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
    postImage: {
        width: '100%',
        height: '100%'
    },
    userNameContainre: {
        backgroundColor: 'white'
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
    multiFeedIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 5,
        right: 5
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
    }
});

export default ProfileTemplate