import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';

import { Images } from '@instagram/assets';
import { useAllUsersList } from '@instagram/customHooks';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const SearchTemplate = () => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const tabBarHeight = useBottomTabBarHeight();

    const [searchText, setSearchText] = useState("");
    const [headerHeight, setHeaderHeight] = useState(0);
    const [hightMeasured, setHeightMeasured] = useState(false);

    const navigation = useNavigation();

    const onUserProfilePress = (item: any) => {
        navigation.navigate("OtherUserProfilePage", {
            otherUserId: item._id
        });
    }

    const { allUsersList, getAllUsersList, allUsersListLoading } = useAllUsersList();

    const [searchedUserList, setSearchedUserList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getAllUsersList();
            return () => {
            };
        }, [])
    );

    useEffect(() => {
        if (searchText === "") {
            getAllUsersList();
            setSearchedUserList([]);
        } else {
            const filteredList = allUsersList.filter((item: any) => item.userName.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedUserList(filteredList ? filteredList : []);
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
                        searchText && !allUsersListLoading ?
                            <>
                                <Image source={Images.NoPostsImage} style={{ width: screenWidth, flex: 1, height: remainingHeight, resizeMode: "contain", backgroundColor: "white" }} />
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", position: 'absolute', bottom: 100, textAlign: 'center' }}>No User Found</Text>
                            </>
                            : <Image source={Images.SearchPage} style={{ width: screenWidth, height: screenHeight - tabBarHeight, resizeMode: "cover", backgroundColor: "white" }} />}
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
                data={searchedUserList ? searchedUserList : []}
                renderItem={({ item, index }: any) => renderUserItem(item, index)}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => hightMeasured && <ListEmptyComponent />}
                scrollEnabled={searchText && searchedUserList?.length !== 0 ? true : false}
                ListHeaderComponent={() => searchText && <View style={{ height: headerHeight + 20 }} />}
            />
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

export default SearchTemplate