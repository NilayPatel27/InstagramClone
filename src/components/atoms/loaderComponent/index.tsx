import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, TouchableHighlight, View } from 'react-native';

import { AppContext } from '@instagram/context/index.tsx';

const LoaderComponent = () => {
    const { state: AppState } = useContext(AppContext);

    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    return (
        <View style={{
            backgroundColor: 'rgba(52, 52, 52, 0.6)',
            height: screenHeight,
            width: screenWidth,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99
        }}>
            <TouchableHighlight underlayColor={'rgb(161,173,178)'} style={{
                width: 100,
                height: 100,
                backgroundColor: 'white',
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
            }}>
                <ActivityIndicator
                    animating={AppState?.Loader?.loaderVisible}
                    color='#999999'
                    size="large"
                    style={{ height: 100 }} />
            </TouchableHighlight>
        </View>
    )
}

export default LoaderComponent;