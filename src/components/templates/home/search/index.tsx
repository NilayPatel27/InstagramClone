import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchTemplate = () => {

    const [searchText, setSearchText] = useState("");

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