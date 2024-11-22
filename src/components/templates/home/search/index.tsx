import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SearchTemplate = () => {

    const [searchText, setSearchText] = useState("");

    const navigation = useNavigation();

    const onUserProfilePress = () => {
        navigation.navigate("OtherUserProfilePage");
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
            <TouchableOpacity style={{ backgroundColor: "red", padding: 5, margin: 10 }} onPress={onUserProfilePress}>
                <Text style={{ color: "black", padding: 5, paddingHorizontal: 10 }}>Name</Text>
            </TouchableOpacity>
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
    }
});

export default SearchTemplate