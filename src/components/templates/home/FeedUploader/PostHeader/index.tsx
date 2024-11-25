import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { Images } from "@instagram/assets/index.tsx";
interface PostHeaderProps {
    userName: string,
    profileUri: string,
    options: boolean,
    onDeletePress?: any,
    feedId?: string
}
const PostHeader = ({ userName, profileUri, onDeletePress, options }: PostHeaderProps) => {

    const { width: windowWidth } = useWindowDimensions();

    const onOptionPress = () => {
        Alert.alert("Are you sure you want to delete this post?", "", [
            {
                text: "Cancel",
                onPress: () => { }
            },
            {
                text: "Delete",
                onPress: () => onDeletePress()
            }
        ])
    }

    return (
        <View style={{
            flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff",
            width: windowWidth, alignItems: "center", borderBottomWidth: 0.5, padding: 10
        }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                {profileUri && profileUri !== null ? <Image source={{ uri: `${profileUri}` }} style={{ height: 25, marginHorizontal: 10, width: 25 }} /> :
                    <Image source={Images.User} style={{ height: 25, marginHorizontal: 10, width: 25 }} />}
                <Text style={{ color: "rgb(0, 0, 0)", fontSize: 15, fontWeight: "bold" }}>{userName}</Text>
            </View>
            <TouchableOpacity
                onPress={onOptionPress}>
                {
                    options &&
                    <SimpleLineIcons
                        name="options-vertical"
                        size={20}
                        color={'black'}
                    />
                }
            </TouchableOpacity>
        </View>
    )
}

export default PostHeader;

const styles = StyleSheet.create({})