import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Images } from "@instagram/assets/index.tsx";

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
            width: windowWidth, alignItems: "center", borderBottomWidth: 0.5, paddingVertical: 5
        }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
                {profileUri && profileUri !== null ? <Image source={{ uri: `${profileUri}` }} style={{ height: 25, marginHorizontal: 10, width: 25 }} /> :
                    <Image source={Images.Plus} style={{ height: 25, marginHorizontal: 10, width: 25 }} />}
                <Text style={{ color: "rgb(0, 0, 0)", fontSize: 15, fontWeight: "bold" }}>{userName ? userName.toUpperCase() : "userName"}</Text>
            </View>
        </View>
    )
}

export default PostHeader;

const styles = StyleSheet.create({})