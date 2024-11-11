import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { Images } from '@instagram/assets';
import { NavigationBar } from '@instagram/components/molecules/index.tsx';
import { Divider } from '@rneui/base';
import { getAccess } from '@instagram/customHooks/setAccess';
import { AppContext } from '@instagram/context';
import { usePrevious } from '@instagram/customHooks';
import { Loader } from '@instagram/components/atoms';

const ProfileTemplate = () => {

    const navigation = useNavigation();
    const [userData, setUserData] = useState<any>({});
    const { state: AppState, feedListRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

    const [userFeedList, setUserFeedList] = useState([]);
    const [userFeedListLoading, setUserFeedListLoading] = useState(false);

    const onPress = () => {
        navigation.navigate("SettingPage");
    }

    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    const screenWidth = Dimensions.get('window').width;
    const postSize = screenWidth / 3 - 2;

    const getUserData = async () => {
        const data: any = await getAccess("user");
        setUserData(JSON.parse(data));
    }

    useEffect(() => {
        getUserData();
        setUserFeedListLoading(true);
        feedListRequest();
    }, []);

    useEffect(() => {
        if (userFeedListLoading && AppState?.FeedList && AppState?.FeedList?.feedListSuccess === true && AppState?.FeedList?.feedListResponse) {
            if (previousAppState?.FeedList !== AppState?.FeedList) {
                setUserFeedListLoading(false);
                if (AppState?.FeedList?.feedListResponse?.status === "Success" || AppState?.FeedList?.feedListResponse?.status === 200) {
                    const userFeedlist = AppState?.FeedList?.feedListResponse?.data?.posts.filter((item: any) => item.userId === userData?.user?._id);
                    setUserFeedList(userFeedlist);
                    console.log("cjdscbks", { userFeedlist, userData });
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.FeedList?.feedListResponse?.message ? AppState?.FeedList?.feedListResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
        } else if (userFeedListLoading && AppState?.FeedList && AppState?.FeedList?.feedListSuccess === false && AppState?.FeedList?.error) {
            if (previousAppState?.FeedList !== AppState?.FeedList) {
                setUserFeedListLoading(false);
                if (AppState?.FeedList?.error && AppState?.FeedList?.error?.code && AppState?.FeedList?.error?.code === 401) {
                    Alert.alert("", AppState?.FeedList?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.FeedList?.error?.error)
                }
            }
        }
    }, [userFeedListLoading, AppState?.FeedList?.feedListSuccess, AppState?.FeedList?.feedListResponse, AppState?.FeedList?.error]);

    useFocusEffect(
        React.useCallback(() => {
            setUserFeedListLoading(true);
            feedListRequest();
            return () => {
            };
        }, [])
    );

    const renderItem = (item: any) => {
        return (
            <>
                <View style={{
                    margin: 1,
                    width: postSize,
                    height: postSize,
                }}>
                    <Image source={{ uri: item.feeds[0] }} style={styles.postImage} />
                </View>
            </>
        );
    };

    return (
        <>
            <NavigationBar rightProps={{ onPress, back: false, right: true, onBack: false, postButton: true }} navigation={navigation} />

            {/* profile header section */}
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={Images.Plus} style={styles.userImage} />
                </View>
                <View style={styles.countContainer}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>15</Text>
                        <Text style={styles.statLabel}>posts</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>1017</Text>
                        <Text style={styles.statLabel}>followers</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>1358</Text>
                        <Text style={styles.statLabel}>following</Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileDescription}>
                <Text style={styles.username}>Nilay Patel</Text>
                <Text style={styles.description}>{description}</Text>
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
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => renderItem(item)}
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
});

export default ProfileTemplate