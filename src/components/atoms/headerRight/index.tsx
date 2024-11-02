import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

interface HeaderRightProps {
    onPress: any,
    navigation: any
}

const HeaderRight = ({ onPress, navigation }: HeaderRightProps) => {

    return (
        <View style={styles.rowStyle}>
            <TouchableHighlight
                onPress={onPress}
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