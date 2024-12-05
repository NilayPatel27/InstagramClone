import React, { useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Animated, Alert, ScrollView, BackHandler, SafeAreaView, StyleSheet } from 'react-native';

import { ImagePicker, PreviewImages, PreviewPostsHeader, PreviewPosts, UploadButton } from "@instagram/components/templates/home/FeedUploader/feedUploaderPages.ts";

const FeedUploaderTemplate = () => {

    const navigation = useNavigation();

    const [images, setImages] = useState<any>([]);

    const [index, setIndex] = useState(false);

    const scrollX = useRef<any>(new Animated.Value(0)).current;

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

    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>

            <View style={styles.mainContainer}>

                <ScrollView style={styles.safeAreaViewContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled>

                    <View style={styles.previewSmallImagesContainer}>
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

            <UploadButton images={images} />

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    previewSmallImagesContainer: {
        backgroundColor: '#eff1ff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
});

export default FeedUploaderTemplate;