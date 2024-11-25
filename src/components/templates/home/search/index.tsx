import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';

import { Images } from '@instagram/assets';
import { useAllUsersList } from '@instagram/customHooks';

const SearchTemplate = () => {

    const [searchText, setSearchText] = useState("");

    const navigation = useNavigation();

    const onUserProfilePress = (item: any) => {
        navigation.navigate("OtherUserProfilePage", {
            otherUserId: item._id
        });
    }

    const { allUsersList, getAllUsersList } = useAllUsersList();

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
                    <Text style={{ color: "black", paddingHorizontal: 10 }}>{item.name}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={{ height: '100%', width: "100%", backgroundColor: "white" }}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder="Search"
                    style={{ padding: 5, marginLeft: 10, color: "black" }}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>

            <FlatList
                data={searchedUserList ? searchedUserList : []}
                renderItem={({ item, index }: any) => renderUserItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
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
        backgroundColor: 'lightgray',
        borderRadius: 30,
        margin: 10
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