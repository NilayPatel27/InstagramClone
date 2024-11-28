import React, { useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackActions, useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList, Image, Dimensions, Alert } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { useAllUsersList, useGetUserDetails, useUserData } from '@instagram/customHooks';

const FriendsListPageTemplate = ({ keyword, userId }: { keyword: string, userId: string }) => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const tabBarHeight = useBottomTabBarHeight();

    const [searchText, setSearchText] = useState("");
    const [headerHeight, setHeaderHeight] = useState(0);
    const [hightMeasured, setHeightMeasured] = useState(false);
    const [userDetails, setUserDetails] = useState<any>({});

    const navigation = useNavigation();
    const { userData } = useUserData();

    const isParentSearchPage = useNavigationState((state) => {
        return state?.routeNames?.includes("SearchPage");
    });

    const onUserProfilePress = (item: any) => {
        if (item._id === userData.user._id) {
            if (isParentSearchPage)
                return Alert.alert("", "Go to Profile Page");

            navigation.dispatch(StackActions.push("ProfilePage"));
            return;
        }
        navigation.dispatch(StackActions.push("OtherUserProfilePage", { otherUserId: item._id }));
    }

    const { getAllUsersList, allUsersListLoading } = useAllUsersList();
    const { getUserDetail, getUserDetailsLoading }: any = useGetUserDetails();

    const [searchedFriendsList, setSearchedFriendsList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [allUsersList, setAllUsersList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const getAllUsersLists = async () => {
                const res = await getAllUsersList();
                setAllUsersList(res);
            }
            getAllUsersLists();
            return () => {
            };
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (userId) {
                const getDetail = async () => {
                    const response = await getUserDetail({ userId: userId });
                    if (response.status === 200)
                        setUserDetails(response.data.user);
                    else {
                        setUserDetails({});
                    }
                }
                getDetail();
            }

            return () => {
            };
        }, [userId])
    );

    const setFriendList = () => {
        const key = `${userDetails[keyword]}`;
        let allUsersLists: any = allUsersList?.filter((item: any) => key.includes(item._id));
        setFriendsList(allUsersLists);
        setSearchedFriendsList(allUsersLists);
    }

    useEffect(() => {
        setFriendList();
    }, [allUsersList, userDetails]);

    useEffect(() => {
        if (searchText === "") {
            const getAllUsersLists = async () => {
                const res = await getAllUsersList();
                setAllUsersList(res);
            }
            getAllUsersLists();
            setFriendList();
        } else {
            const filteredList = friendsList?.filter((item: any) => item.userName.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedFriendsList(filteredList ? filteredList : []);
        }
    }, [searchText]);

    const renderUserItem = (item: any, index: any) => {
        return (
            <TouchableOpacity style={styles.renderItemContainer} onPress={() => onUserProfilePress(item)} key={index}>

                <View style={{
                    height: 55,
                    width: 55,
                    borderRadius: 25,
                    backgroundColor: "lightgray"
                }}>
                    {
                        item.profileImage ?
                            <Image
                                source={{ uri: item.profileImage }}
                                style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 40
                                }}
                            />
                            :
                            <Image source={Images.User} style={styles.userImage} />
                    }

                </View>

                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ color: "black", paddingHorizontal: 10 }}>{item.userName}</Text>
                    {item.name && <Text style={{ color: "black", paddingHorizontal: 10 }}>{item.name}</Text>}
                </View>

            </TouchableOpacity>
        )
    }

    const ListEmptyComponent = () => {
        const remainingHeight = screenHeight - headerHeight - tabBarHeight;
        return (
            <>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    {
                        searchText && !allUsersListLoading &&
                        <>
                            <Image source={Images.NoPostsImage} style={{ width: screenWidth, flex: 1, height: remainingHeight, resizeMode: "contain", backgroundColor: "white" }} />
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", position: 'absolute', bottom: 100, textAlign: 'center' }}>No User Found</Text>
                        </>
                    }
                </View>
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.searchBarContainer}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height);
                    setHeightMeasured(true);
                }} >
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={"black"}
                    style={{ padding: 5, paddingLeft: 10, color: "black", width: "100%", borderRadius: 30 }}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>

            <FlatList
                data={searchedFriendsList ? searchedFriendsList : []}
                renderItem={({ item, index }: any) => renderUserItem(item, index)}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => hightMeasured && <ListEmptyComponent />}
                scrollEnabled={searchedFriendsList?.length !== 0 ? true : false}
                ListHeaderComponent={() => <View style={{ height: headerHeight + 20 }} />}
            />
            <Loader visible={getUserDetailsLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        position: 'absolute',
        width: '95%',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    userImage: {
        width: 55,
        height: 55,
        borderRadius: 40
    },
    renderItemContainer: {
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default FriendsListPageTemplate