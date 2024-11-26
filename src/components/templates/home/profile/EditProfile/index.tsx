import RNFS from "react-native-fs";
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Images } from '@instagram/assets';
import { Loader } from '@instagram/components/atoms';
import { NavigationBar } from '@instagram/components/molecules';
import { useGetUserDetails, useStoragePermission, useUpdateUserDetails, useUserData } from '@instagram/customHooks';

const EditPorfileTemplate = () => {

    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack()
    }

    const { userData } = useUserData();
    const { userDetails, getUserDetail, getUserDetailsLoading }: any = useGetUserDetails();
    const { updateUserDetail, updateUserDetailsLoading } = useUpdateUserDetails();

    const [userProfileImage, setUserProfileImage] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [userBio, setUserBio] = useState("");

    const [image, setImage] = useState<any>("");

    const { permission, requestStoragePermission } = useStoragePermission();

    const onEditPicturePress = async () => {

        if (permission === 'never_ask_again') {
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
                setImage(file);
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

    useEffect(() => {
        if (userData?.user?._id)
            getUserDetail({ userId: userData?.user?._id });
    }, [userData]);

    useEffect(() => {
        if (userDetails) {
            const { profileImage, name, userName, bio } = userDetails;
            profileImage && setUserProfileImage(profileImage);
            name && setUserFullName(name);
            userName && setUserName(userName);
            bio && setUserBio(bio);
        }
    }, [userDetails]);

    const goBack = () => {
        if (image?.length > 0) {
            Alert.alert("", "Are you sure you want to discard your images?", [
                { text: "No", onPress: () => { } },
                {
                    text: "Yes", onPress: () => {
                        setImage("");
                    }
                },
            ]);
        }
        else {
            navigation.goBack();
        }
    };

    const onUploadButtonPress = async () => {

        let profileImage = "";

        if (image) {
            await RNFS.readFile(image[0].uri, "base64")
                .then(base64 => {
                    profileImage = `data:${image[0].type};base64,${base64}`
                }).catch((e) => {
                    console.log("error", e);
                    return;
                });
        } else {
            profileImage = userProfileImage;
        }

        let data = new FormData();
        data.append("name", userFullName);
        data.append("bio", userBio);
        data.append("userId", userDetails?._id);
        data.append("profileImage", profileImage);

        updateUserDetail(data);
    }

    return (
        <>
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
                        placeholder="Enter your full name"
                        placeholderTextColor={"gray"}
                    />
                </View>

                <View style={{ justifyContent: "center", borderWidth: 1, borderColor: "gray", marginHorizontal: 20, marginBottom: 15, borderRadius: 10, }}>
                    <Text style={{ color: "black", padding: 5, paddingHorizontal: 10 }}>Username</Text>
                    <TextInput
                        style={{ padding: 5, paddingHorizontal: 10, color: "gray", fontWeight: 'bold' }}
                        value={userName}
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
                        placeholder="Enter your bio"
                        placeholderTextColor={"gray"}
                    />
                </View>

            </View>
            <Loader visible={getUserDetailsLoading || updateUserDetailsLoading} />
        </>
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