import ImageCropPicker from 'react-native-image-crop-picker';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Alert, useWindowDimensions } from 'react-native';

import { Images } from '@instagram/assets';

const PreviewPosts = ({ images, scrollX, setImages, index, setIndex }: any) => {

    let { width: windowWidth } = useWindowDimensions();

    const keyExtractor = useCallback((_: any, index: any) => index.toString(), []);

    const [indexOfPost, setIndexOfPost] = useState(0);

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewRef = useRef((viewableItems: any) => {
        setIndexOfPost(viewableItems?.viewableItems[0]?.index);
    });

    useEffect(() => {
        return () => {
            {
                images?.length > 0 &&
                    scrollX?.current?.scrollToIndex({ animated: true, index: 0 });
            }
            scrollX?.removeAllListeners();
        };
    }, [images]);

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
    )
}

export default PreviewPosts;