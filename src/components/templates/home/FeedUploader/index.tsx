import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    View, Text, Animated, Alert, Platform, PermissionsAndroid, ScrollView, BackHandler,
    Image, FlatList, SafeAreaView, useWindowDimensions, TouchableOpacity
} from 'react-native';

import DocumentPicker from "react-native-document-picker";
import ImageCropPicker from 'react-native-image-crop-picker';

import { Images } from "@instagram/assets/index.tsx";
import PostHeader from '@instagram/components/templates/home/FeedUploader/PostHeader/index';

const FeedUploaderTemplate = () => {
    const navigation = useNavigation();
    let { width: windowWidth } = useWindowDimensions();

    const [images, setImages] = useState<any>([]);
    const [permission, setPermission] = useState("");

    const [index, setIndex] = useState(false);
    const [indexOfPost, setIndexOfPost] = useState(0);

    const scrollX = useRef<any>(new Animated.Value(0)).current;
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewRef = useRef((viewableItems: any) => {
        setIndexOfPost(viewableItems?.viewableItems[0]?.index);
    });

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => {
                console.log("Permission request result", res);
                setPermission(res);
            }).catch((err) => {
                console.error("Permission request failed", err);
            });
        }
    };

    const imagePicker = async () => {
        if (permission === 'never_ask_again') {
            console.log("Image Picker");
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
        if (permission === "never_ask_again")
            imagePicker();
    }, [permission]);

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
                    }
                },
            ]);
        }
        else {
            console.log("Go back");
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
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    {images?.length > 0 &&
                        <>
                            <View style={{
                                backgroundColor: '#eff1ff',
                                paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
                                marginHorizontal: 10, marginTop: 10,
                                marginBottom: 5, flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => imagePicker()}>
                                    <Image
                                        source={Images.Image}
                                        style={{ width: 25, height: 25, marginRight: 10 }} />
                                </TouchableOpacity>
                                <FlatList
                                    data={images}
                                    renderItem={({ item, index }) => renderItems({ item, index })}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={keyExtractor}
                                />

                            </View>
                            <Text style={{ color: 'black', padding: 10, textAlign: "center" }}>-: Preview :-</Text>
                            <View style={{ width: windowWidth, backgroundColor: '#fff' }}>
                                <PostHeader userName={"Nilay Patel"} profileUri={""} options={false} />
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
        </SafeAreaView>

    )
}

export default FeedUploaderTemplate;