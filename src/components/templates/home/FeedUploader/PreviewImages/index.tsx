import React, { useCallback } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import { Images } from '@instagram/assets';
import { useNavigation } from '@react-navigation/native';

const PreviewImages = ({ images, setImages, index, setIndex }: any) => {

    const navigation = useNavigation();

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

    return (
        <FlatList
            data={images}
            renderItem={({ item, index }) => renderItems({ item, index })}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
        />
    )
}

export default PreviewImages;