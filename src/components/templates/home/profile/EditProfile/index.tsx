import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Images } from '@instagram/assets';
import { NavigationBar } from '@instagram/components/molecules';
import { useStoragePermission, useUserData } from '@instagram/customHooks';

const EditPorfileTemplate = () => {

    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack()
    }

    const { userData } = useUserData();

    const [userProfileImage, setUserProfileImage] = useState(userData?.user?.profileImage || "");
    const [userFullName, setUserFullName] = useState(userData?.user?.name || "User Name");
    const [userBio, setUserBio] = useState(userData?.user?.bio || "Bio");

    const [images, setImages] = useState("");

    const { permission, requestStoragePermission } = useStoragePermission();

    const onEditPicturePress = async () => {

        if (permission === 'never_ask_again') {
            console.log("Image Picker");
            const file: any = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: [DocumentPicker.types.images],
                presentationStyle: "fullScreen"
            }).catch(() => {
                goBack();
            });

            let valid = true;

            file?.map((item: any) => {
                if (["jpeg", "jpg", "png", "gif"].indexOf(item?.name?.split(".").pop()?.toLowerCase()) === -1 || item?.size > 150000) {
                    return valid = false;
                }
            });

            if (valid) {
                setImages(file);
                setUserProfileImage(file[0]?.uri);
            } else {
                Alert.alert("", "Upload .jpeg, .jpg, .png or .gif images only and size should be less than 150 kb", [
                    { text: "OK", onPress: () => { } }
                ]);
            }

        } else {
            Alert.alert("", "Please allow access to storage in app settings", [
                { text: "OK", onPress: () => { } }
            ]);
        }
    }

    useEffect(() => {
        requestStoragePermission();
    }, []);

    const goBack = () => {
        if (images?.length > 0) {
            Alert.alert("", "Are you sure you want to discard your images?", [
                { text: "No", onPress: () => { } },
                {
                    text: "Yes", onPress: () => {
                        setImages("");
                    }
                },
            ]);
        }
        else {
            navigation.goBack();
        }
    };

    const onUploadButtonPress = () => {
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <NavigationBar rightProps={{ back: true, right: true, onBack, text: "Edit profile", onPress: onUploadButtonPress, uploadButton: true }} navigation={navigation} />
            <View style={styles.imageContainer}>
                {
                    userProfileImage ?
                        <Image source={{ uri: userProfileImage }} style={styles.userImage} /> :
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