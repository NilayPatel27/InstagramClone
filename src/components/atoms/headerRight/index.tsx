import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, PermissionsAndroid, Platform, StyleSheet, TouchableHighlight, View } from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface HeaderRightProps {
    onPress: any,
    navigation: any,
    postButton?: boolean
}

const HeaderRight = ({ onPress, navigation, postButton }: HeaderRightProps) => {

    const onPostButtonPress = () => {
        navigation.navigate("FeedUploader");
    }

    return (
        <View style={styles.rowStyle}>
            {
                postButton &&
                <TouchableHighlight
                    onPress={() => onPostButtonPress()}
                    style={styles.buttonStyle}
                    underlayColor={"#f0f0f0"}
                >
                    <FontAwesome name="plus-square-o" size={30} color={"black"} />
                </TouchableHighlight>
            }
            <TouchableHighlight
                onPress={() => onPress()}
                style={styles.buttonStyle}
                underlayColor={"#f0f0f0"}
            >
                <Octicons name="three-bars" size={30} color={"black"} />
            </TouchableHighlight>
        </View>
    )
}

export default HeaderRight;

const styles = StyleSheet.create({
    rowStyle: { flexDirection: "row", paddingHorizontal: 5 },
    buttonStyle: { padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
})