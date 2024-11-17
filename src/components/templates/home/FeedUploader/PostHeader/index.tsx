import { Image, StyleSheet, Text, Touchable, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Images } from "@instagram/assets/index.tsx";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
interface PostHeaderProps {
    userName: string,
    profileUri: string,
    options: boolean
}
const PostHeader = ({ userName, profileUri }: PostHeaderProps) => {

    const { width: windowWidth } = useWindowDimensions();
    return (
        <View style={{
            flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff",
            width: windowWidth, alignItems: "center", borderBottomWidth: 0.5, padding: 10
        }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                {profileUri && profileUri !== null ? <Image source={{ uri: `${profileUri}` }} style={{ height: 25, marginHorizontal: 10, width: 25 }} /> :
                    <Image source={Images.Plus} style={{ height: 25, marginHorizontal: 10, width: 25 }} />}
                <Text style={{ color: "rgb(0, 0, 0)", fontSize: 15, fontWeight: "bold" }}>{userName}</Text>
            </View>
            <TouchableOpacity
                onPress={() => { }}>
                <SimpleLineIcons
                    name="options-vertical"
                    size={20}
                    color={'black'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PostHeader;

const styles = StyleSheet.create({})