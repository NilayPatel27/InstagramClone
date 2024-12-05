import RNFS from "react-native-fs";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    View, Text, Animated, Alert, ScrollView, BackHandler,
    SafeAreaView, TouchableOpacity
} from 'react-native';


import { usePrevious } from '@instagram/customHooks';
import { getAccess } from '@instagram/customHooks/useAccess';
import { Loader } from "@instagram/components/atoms";
import { AppContext } from "@instagram/context";
import ImagePicker from "@instagram/components/templates/home/FeedUploader/ImagePicker/index.tsx";
import PreviewImages from "@instagram/components/templates/home/FeedUploader/PreviewImages/index.tsx";
import PreviewPostsHeader from "@instagram/components/templates/home/FeedUploader/PreviewPostsHeader/index.tsx";
import PreviewPosts from "@instagram/components/templates/home/FeedUploader/PreviewPosts/index.tsx";

const FeedUploaderTemplate = () => {

    const navigation = useNavigation();

    const [images, setImages] = useState<any>([]);

    const [index, setIndex] = useState(false);
    const [feedUploadLoading, setFeedUploadLoading] = useState(false);
    const [postUploading, setPostUploading] = useState(false);

    const scrollX = useRef<any>(new Animated.Value(0)).current;

    const { state: AppState, documentUploadRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

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

    useFocusEffect(
        React.useCallback(() => {
            let mounted = true;
            const unsubscribe = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    if (mounted) {
                        goBack();
                        return true;
                    }
                    return false;
                }
            );
            return () => {
                mounted = false;
                unsubscribe?.remove();
            };
        }, [images])
    );

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

    const onPostUploadPress = async () => {
        const userData: any = await getAccess("user");

        let array: any = [];
        if (images?.length > 0) {
            for (let i = 0; i < images?.length; i++) {
                await RNFS.readFile(images[i]?.uri, "base64")
                    .then(base64 => {
                        array.push(`data:${images[i]?.type};base64,${base64}`);
                    }).catch(() => {
                        return;
                    });
            }
            let data = new FormData();
            data.append("userId", JSON.parse(userData).user._id);
            data.append("feeds", array);

            setFeedUploadLoading(true);

            documentUploadRequest(data);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>

                    <View style={{
                        backgroundColor: '#eff1ff',
                        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
                        marginHorizontal: 10, marginTop: 10,
                        marginBottom: 5, flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <ImagePicker images={images} setImages={setImages} scrollX={scrollX} />
                        <PreviewImages images={images} setImages={setImages} index={index} setIndex={setIndex} />
                    </View>

                    {images?.length > 0 &&
                        <>
                            <PreviewPostsHeader />
                            <PreviewPosts images={images} scrollX={scrollX} setImages={setImages} index={index} setIndex={setIndex} />
                        </>
                    }

                </ScrollView>
            </View>
            {/* //upload button  */}
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
            </View>
            <Loader visible={feedUploadLoading} />

        </SafeAreaView>

    )
}

export default FeedUploaderTemplate;