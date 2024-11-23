import { Divider } from '@rneui/base';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, TouchableHighlight, Dimensions } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import { useFeedsList, useUserData } from '@instagram/customHooks';

const OtherUserProfileTemplate = () => {
    const { userData } = useUserData();
    const navigation = useNavigation();

    const userName = userData?.user?.name || "User Name";
    const userBio = userData?.user?.bio || "User Bio";
    const followers = userData?.user?.followers?.length || 0;
    const following = userData?.user?.following?.length || 0;

    const [followed, setFollowed] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const postSize = screenWidth / 3 - 2;

    const { getFeedsList, userFeedListLoading, userFeedList } = useFeedsList();

    useEffect(() => {
        getFeedsList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getFeedsList();
            return () => {
            };
        }, [])
    );

    const onBack = () => {
        navigation.goBack();
    }

    const onFollowUnfollowPress = () => {
        setFollowed(!followed);
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
                <NavigationBar rightProps={{ back: true, right: false, onBack }} navigation={navigation} userName={userData?.user?.userName} />

                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        <Image source={Images.User} style={styles.userImage} />
                    </View>

                    <View style={styles.countContainer}>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{userFeedList ? userFeedList.length : 0}</Text>
                            <Text style={styles.statLabel}>posts</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{followers}</Text>
                            <Text style={styles.statLabel}>followers</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <Text style={styles.stat}>{following}</Text>
                            <Text style={styles.statLabel}>following</Text>
                        </View>

                    </View>

                </View >

                <View style={styles.profileDescription}>
                    <Text style={styles.username}>{userName}</Text>
                    <Text style={styles.description}>{userBio}</Text>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={[styles.editButton, { backgroundColor: followed ? '#D3D3D3' : '#1E90FF' }]} onPress={onFollowUnfollowPress}>
                        <Text style={[styles.followUnfollowText, { color: followed ? 'black' : 'white' }]}>{followed ? "Unfollow" : "Follow"}</Text>
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

                <Loader visible={userFeedListLoading} />
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
    username: {
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