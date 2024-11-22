import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface HeaderRightProps {
    onPress: any,
    navigation: any,
    postButton?: boolean,
    menuButton?: boolean,
    uploadButton?: boolean
}

const HeaderRight = ({ onPress, navigation, postButton, menuButton, uploadButton }: HeaderRightProps) => {

    const onPostButtonPress = () => {
        navigation.navigate("FeedUploader");
    }

    return (
        <View style={styles.rowStyle}>

            {
                postButton &&
                <TouchableOpacity
                    onPress={() => onPostButtonPress()}
                    style={styles.buttonStyle}
                >
                    <FontAwesome name="plus-square-o" size={30} color={"black"} />
                </TouchableOpacity>
            }

            {menuButton &&
                <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.buttonStyle}
                >
                    <Octicons name="three-bars" size={30} color={"black"} />
                </TouchableOpacity>
            }

            {uploadButton &&
                <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.buttonStyle}>
                    <Octicons name="upload" size={30} color={"black"} />
                </TouchableOpacity>
            }

        </View>
    )
}

export default HeaderRight;

const styles = StyleSheet.create({
    rowStyle: { flexDirection: "row", paddingHorizontal: 5 },
    buttonStyle: { padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
})