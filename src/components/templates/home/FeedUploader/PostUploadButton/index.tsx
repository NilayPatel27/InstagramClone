import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context/index.tsx';
import { usePrevious, useUserData } from '@instagram/customHooks';

const UploadButton = ({ images }: any) => {

    const navigation = useNavigation();
    const { userData } = useUserData();

    const { state: AppState, documentUploadRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

    const [postUploading, setPostUploading] = useState(false);
    const [feedUploadLoading, setFeedUploadLoading] = useState(false);

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

            setFeedUploadLoading(true);
            documentUploadRequest(data);
        }
    }

    useEffect(() => {
        if (feedUploadLoading && AppState?.DocumentUpload && AppState?.DocumentUpload?.documentUploadSuccess === true && AppState?.DocumentUpload?.documentUploadResponse) {
            if (previousAppState?.DocumentUpload !== AppState?.DocumentUpload) {
                setFeedUploadLoading(false);
                if (AppState?.DocumentUpload?.documentUploadResponse?.status === "Success" || AppState?.DocumentUpload?.documentUploadResponse?.status === 200) {
                    setPostUploading(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.DocumentUpload?.documentUploadResponse?.message ? AppState?.DocumentUpload?.documentUploadResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
        } else if (feedUploadLoading && AppState?.DocumentUpload && AppState?.DocumentUpload?.documentUploadSuccess === false && AppState?.DocumentUpload?.error) {
            if (previousAppState?.DocumentUpload !== AppState?.DocumentUpload) {
                setFeedUploadLoading(false);
                if (AppState?.DocumentUpload?.error && AppState?.DocumentUpload?.error?.code && AppState?.DocumentUpload?.error?.code === 401) {
                    Alert.alert("", AppState?.DocumentUpload?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.DocumentUpload?.error?.error)
                }
            }
        }
    }, [feedUploadLoading, AppState?.DocumentUpload?.documentUploadSuccess, AppState?.DocumentUpload?.documentUploadResponse, AppState?.DocumentUpload?.error]);

    useEffect(() => {
        if (postUploading && !AppState?.Loader?.loaderVisible) {
            navigation.goBack();
        }
    }, [postUploading, AppState?.Loader?.loaderVisible]);

    return (
        <View style={{ backgroundColor: '#fff', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                style={{ backgroundColor: '#0095f6', padding: 10, borderRadius: 5, width: '95%', alignItems: 'center', justifyContent: 'center' }}
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

export default UploadButton