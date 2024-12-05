import React, { useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    View, Animated, Alert, ScrollView, BackHandler,
    SafeAreaView
} from 'react-native';

import ImagePicker from "@instagram/components/templates/home/FeedUploader/ImagePicker/index.tsx";
import PreviewImages from "@instagram/components/templates/home/FeedUploader/PreviewImages/index.tsx";
import PreviewPostsHeader from "@instagram/components/templates/home/FeedUploader/PreviewPostsHeader/index.tsx";
import PreviewPosts from "@instagram/components/templates/home/FeedUploader/PreviewPosts/index.tsx";
import UploadButton from "@instagram/components/templates/home/FeedUploader/PostUploadButton/index.tsx";

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

            <UploadButton images={images} />

        </SafeAreaView>

    )
}

export default FeedUploaderTemplate;