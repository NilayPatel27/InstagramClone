import { Divider } from '@rneui/base';
import React, { useEffect } from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { useFeedsList, useUserData } from '@instagram/customHooks';
import { NavigationBar } from '@instagram/components/molecules/index.tsx';

const ProfileTemplate = () => {

    const navigation = useNavigation();
    const { userData } = useUserData();

    const userName = userData?.user?.name || "User Name";
    const userBio = userData?.user?.bio || "User Bio";
    const followers = userData?.user?.followers?.length || 0;
    const following = userData?.user?.following?.length || 0;

    const { getFeedsList, userFeedListLoading, userFeedList } = useFeedsList();

    const onPress = () => {
        navigation.navigate("SettingPage");
    }

    const screenWidth = Dimensions.get('window').width;
    const postSize = screenWidth / 3 - 2;

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
            <NavigationBar rightProps={{ onPress, back: false, right: true, onBack: false, postButton: true }} navigation={navigation} userName={userData?.user?.userName} />

            {/* profile header section */}
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
            <Loader visible={userFeedListLoading} />
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
        alignItems: 'center',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statsContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white',
    },
    stat: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    statLabel: {
        fontSize: 14,
        color: 'black',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    userNameContainre: {
        backgroundColor: 'white',
    },
    profileDescription: {
        padding: 10,
        backgroundColor: 'white',
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
    }
});

export default ProfileTemplate