import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Images } from '@instagram/assets';
import { useUserData } from '@instagram/customHooks';
import { NavigationBar } from '@instagram/components/molecules';

const EditPorfileTemplate = () => {

    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack()
    }
    const { userData } = useUserData();

    const [userFullName, setUserFullName] = useState(userData?.user?.name || "User Name");
    const [userBio, setUserBio] = useState(userData?.user?.bio || "Bio");

    const onEditPicturePress = () => {
    }

    const onUploadButtonPress = () => {
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <NavigationBar rightProps={{ back: true, right: true, onBack, text: "Edit profile", onPress: onUploadButtonPress, uploadButton: true }} navigation={navigation} />
            <View style={styles.imageContainer}>
                {
                    userData?.user?.profileImage ?
                        <Image source={{ uri: userData?.user?.profileImage }} style={styles.userImage} /> :
                        <Image source={Images.User} style={styles.userImage} />
                }
            </View>

            <TouchableOpacity style={styles.editPictureContainer} onPress={onEditPicturePress}>
                <Text style={{ color: 'blue' }}>Edit Picture</Text>
            </TouchableOpacity>

            <View style={{ justifyContent: "center", borderWidth: 1, borderColor: "gray", marginHorizontal: 20, marginBottom: 15, borderRadius: 10, }}>
                <Text style={{ color: "black", padding: 5, paddingHorizontal: 10 }}>Name</Text>
                <TextInput
                    style={{ padding: 5, paddingHorizontal: 10, color: "gray", fontWeight: 'bold' }}
                    value={userFullName}
                    onChangeText={(text) => setUserFullName(text)}
                />
            </View>

            <View style={{ justifyContent: "center", borderWidth: 1, borderColor: "gray", marginHorizontal: 20, marginBottom: 15, borderRadius: 10, }}>
                <Text style={{ color: "black", padding: 5, paddingHorizontal: 10 }}>Username</Text>
                <TextInput
                    style={{ padding: 5, paddingHorizontal: 10, color: "gray", fontWeight: 'bold' }}
                    value={userData?.user?.username || "Username"}
                    editable={false}
                />
            </View>

            <View style={{ justifyContent: "center", borderWidth: 1, borderColor: "gray", marginHorizontal: 20, marginBottom: 15, borderRadius: 10, }}>
                <Text style={{ color: "black", padding: 5, paddingHorizontal: 10 }}>Bio</Text>
                <TextInput
                    style={{ padding: 5, paddingHorizontal: 10, color: "gray", fontWeight: 'bold' }}
                    value={userBio}
                    onChangeText={(text) => setUserBio(text)}
                    maxLength={100}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    editPictureContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20
    }
});

export default EditPorfileTemplate