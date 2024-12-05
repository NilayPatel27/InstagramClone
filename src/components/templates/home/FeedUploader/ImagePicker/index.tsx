import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { useStoragePermission } from '@instagram/customHooks';

const ImagePicker = ({ images, setImages, scrollX }: any) => {

    const navigation = useNavigation();

    const { permission, requestStoragePermission } = useStoragePermission();

    useEffect(() => {
        requestStoragePermission();
    }, []);

    const goBack = () => {
        if (images?.length > 0) {
            Alert.alert("", "Are you sure you want to discard your images?", [
                { text: "No", onPress: () => { } },
                {
                    text: "Yes", onPress: () => {
                        setImages([]);
                        navigation.goBack();
                    }
                },
            ]);
        }
        else {
            navigation.goBack();
        }
    };

    const imagePicker = async () => {
        if (permission === 'never_ask_again') {
            const file = await DocumentPicker.pick({
                allowMultiSelection: true,
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
                if (file?.length + images?.length > 10) {
                    Alert.alert("", "Maximum 10 images can be uploaded at a time", [
                        { text: "OK", onPress: () => { } }
                    ]);

                    images?.length > 0 && scrollX?.current?.scrollToIndex({ animated: true, index: 0 });
                    scrollX?.removeAllListeners();
                }
                else {
                    setImages([...images, ...file]);
                }
            }
            else {
                Alert.alert("", "Upload .jpeg, .jpg, .png or .gif images only and size should be less than 150 kb", [
                    {
                        text: "OK", onPress: () => { imagePicker(); }
                    }
                ]);
            }

        } else {
            Alert.alert("", "Please allow access to storage in app settings", [
                { text: "OK", onPress: () => { } }
            ]);
        }
    }

    useEffect(() => {
        console.log({ permission });
        if (permission === "never_ask_again")
            imagePicker();
    }, [permission]);

    return (
        <TouchableOpacity onPress={() => imagePicker()}>
            <FontAwesome name="plus-square-o" size={25} color={"orange"} style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>
    )
}

export default ImagePicker

const styles = StyleSheet.create({})