import RNFS from "react-native-fs";
import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context/index.tsx';
import { useFeedUpload, useUserData } from '@instagram/customHooks';

const UploadButton = ({ images }: any) => {

    const navigation = useNavigation();

    const { userData } = useUserData();
    const { feedUpload, feedUploadLoading, postUploading } = useFeedUpload();

    const { state: AppState } = useContext(AppContext);

    useEffect(() => {
        if (postUploading && !AppState?.Loader?.loaderVisible) {
            navigation.goBack();
        }
    }, [postUploading, AppState?.Loader?.loaderVisible]);

    const onPostUploadPress = async () => {
        let array: any = [];
        if (images?.length > 0) {
            for (let i = 0; i < images?.length; i++) {
                await RNFS.readFile(images[i]?.uri, "base64")
                    .then(base64 => {
                        array.push(`data:${images[i]?.type};base64,${base64}`);
                    }).catch((e) => {
                        console.log('error', e)
                        return;
                    });
            }

            let data = new FormData();
            data.append("userId", userData.user._id);
            data.append("feeds", array);
            feedUpload(data);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonContainer}
                disabled={images?.length < 1}
                onPress={onPostUploadPress}
            >
                <Text
                    style={{
                        color: images?.length < 1 ? '#99b7f3' : '#fff',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Upload</Text>
            </TouchableOpacity>
            <Loader visible={feedUploadLoading} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: '#0095f6',
        padding: 10,
        borderRadius: 5,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UploadButton