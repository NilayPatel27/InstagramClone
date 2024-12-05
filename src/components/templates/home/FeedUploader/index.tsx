import RNFS from "react-native-fs";
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    View, Text, Animated, Alert, ScrollView, BackHandler,
    Image, FlatList, SafeAreaView, useWindowDimensions, TouchableOpacity
} from 'react-native';

import ImageCropPicker from 'react-native-image-crop-picker';

import { Images } from "@instagram/assets/index.tsx";
import { useGetUserDetails, usePrevious, useUserData } from '@instagram/customHooks';
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';
import { getAccess } from '@instagram/customHooks/useAccess';
import { Loader } from "@instagram/components/atoms";
import { AppContext } from "@instagram/context";
import ImagePicker from "@instagram/components/templates/home/FeedUploader/ImagePicker/index.tsx";

const FeedUploaderTemplate = () => {

    const navigation = useNavigation();
    let { width: windowWidth } = useWindowDimensions();
    const { userDetails, getUserDetail, getUserDetailsLoading }: any = useGetUserDetails();
    const { userData } = useUserData();

    const [images, setImages] = useState<any>([]);

    const [index, setIndex] = useState(false);
    const [indexOfPost, setIndexOfPost] = useState(0);
    const [feedUploadLoading, setFeedUploadLoading] = useState(false);
    const [postUploading, setPostUploading] = useState(false);

    const scrollX = useRef<any>(new Animated.Value(0)).current;
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewRef = useRef((viewableItems: any) => {
        setIndexOfPost(viewableItems?.viewableItems[0]?.index);
    });

    const { state: AppState, documentUploadRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

    useFocusEffect(
        React.useCallback(() => {
            if (userData?.user?._id)
                getUserDetail({ userId: userData?.user?._id });
            return () => {
            };
        }, [userData])
    );

    const [userProfileImage, setUserProfileImage] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (userDetails) {
            const { profileImage, userName, bio } = userDetails;
            profileImage && setUserProfileImage(profileImage);
            userName && setUserName(userName);
        }
    }, [userDetails]);

    useEffect(() => {
        return () => {
            {
                images?.length > 0 &&
                    scrollX?.current?.scrollToIndex({ animated: true, index: 0 });
            }
            scrollX?.removeAllListeners();
        };
    }, [images]);

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

    const keyExtractor = useCallback((_: any, index: any) => index.toString(), []);

    const removeImage = (indexx: any) => {
        let newData = images;
        newData.splice(indexx, 1);
        setImages(newData);
        setIndex(!index);
        if (newData.length === 0 || newData === undefined || newData === null) {
            navigation.goBack();
        }
    };

    const renderItems = ({ item, index }: any) => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: '#FFF', height: 50, width: 40, margin: 10, borderRadius: 5 }}>
                <Image source={{ uri: `${item?.uri ? item?.uri : item?.path}` }} style={{ width: 40, height: 50, borderRadius: 5 }} />
                <View style={{ borderRadius: 50, position: "absolute", right: -8, top: -8 }}>
                    <TouchableOpacity onPress={() => removeImage(index)}>
                        <Image
                            source={Images.Remove}
                            style={{ width: 16, height: 16, borderRadius: 50, backgroundColor: '#FFF' }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const previewImages = ({ item, index }: any) => {
        return (
            <View style={{ aspectRatio: 1, backgroundColor: '#fff', width: windowWidth }} key={index}>
                <Image source={{ uri: `${item?.uri ? item?.uri : item?.path}` }}
                    style={{ width: windowWidth, aspectRatio: 1, marginTop: 5 }}
                    resizeMode="contain"
                />
            </View>
        );
    };

    const cropImage = async (path: any, indexx: any) => {
        if (images[indexx]?.type === "image/gif") {
            return Alert.alert("", "GIF images cannot be cropped", [
                { text: "OK", onPress: () => { } }
            ]);
        }

        await ImageCropPicker.openCropper({
            path: `${path}`,
            freeStyleCropEnabled: true,
            mediaType: 'photo'
        }).then(image => {
            let newData = images;
            let newImage = { "name": images[indexx].name, "size": image.size, "type": image.mime, "uri": image.path };
            newData[indexx] = newImage;
            setImages(newData);
            setIndex(!index);
        });
    };

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
                        <FlatList
                            data={images}
                            renderItem={({ item, index }) => renderItems({ item, index })}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={keyExtractor}
                        />
                    </View>

                    {images?.length > 0 &&
                        <>
                            <Text style={{ color: 'black', padding: 10, textAlign: "center" }}>-: Preview :-</Text>
                            <View style={{ width: windowWidth, backgroundColor: '#fff' }}>
                                <PostHeader userName={userName} profileUri={userProfileImage} options={false} />
                            </View>
                            <View style={{ backgroundColor: '#fff', justifyContent: "flex-start", alignItems: "center" }}>
                                <Animated.FlatList
                                    ref={scrollX}
                                    data={images}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: false }
                                    )}
                                    renderItem={({ item, index }) => previewImages({ item, index })}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    viewabilityConfig={viewConfigRef?.current}
                                    onViewableItemsChanged={onViewRef?.current}
                                    keyExtractor={keyExtractor}
                                    scrollEnabled={images.length > 1 ? true : false}
                                />
                                {images?.length > 1 &&
                                    <View style={{ position: "absolute", backgroundColor: "#2d333aCC", borderRadius: 10, padding: 5, top: 10, right: 10 }}>
                                        <Text style={{ color: '#fff' }}>{indexOfPost + 1}/{images?.length}</Text>
                                    </View>
                                }

                                <View style={{ backgroundColor: "transparent", width: 35, padding: 5, position: "absolute", right: 25, height: windowWidth, aspectRatio: 1 }} >
                                    <TouchableOpacity
                                        onPress={() => cropImage(images[indexOfPost]?.uri ? images[indexOfPost]?.uri : images[indexOfPost]?.path, indexOfPost)}
                                        style={{ backgroundColor: "transparent", bottom: 25, height: 35, position: "absolute", width: 35 }}>
                                        <View style={{ backgroundColor: "#eff1ff", borderRadius: 5, padding: 5, justifyContent: "center", alignItems: "center" }}>
                                            <Image
                                                source={Images.Edit}
                                                style={{ width: 25, height: 25 }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {images?.length > 1 &&
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        height: 50
                                    }}>
                                        {
                                            images?.map((_: any, index: any) => {
                                                return (
                                                    <View style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: 4,
                                                        marginHorizontal: 4,
                                                        backgroundColor: index === indexOfPost ? 'rgb(246,163,1)' : "gray"
                                                    }} key={index} />
                                                );
                                            })
                                        }
                                    </View>
                                }

                            </View>
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
            <Loader visible={feedUploadLoading || getUserDetailsLoading} />

        </SafeAreaView>

    )
}

export default FeedUploaderTemplate;