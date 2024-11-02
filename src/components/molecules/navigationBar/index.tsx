import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { HeaderRight, HeaderLeft } from '@instagram/components/atoms/index.tsx';

interface NavigationBarProps {
    rightProps: { onBack: any, back: boolean, right: boolean, onPress: any };
    navigation: any;
}

const NavigationBar = ({ rightProps, navigation }: NavigationBarProps) => {
    return (
        <SafeAreaView style={rightProps.right ? styles.safeAreaViewRightStyle : styles.safeAreaViewStyle}>
            {
                rightProps.back &&
                <View style={{ alignItems: "center", flexDirection: "row", padding: 5 }}>
                    <HeaderLeft navigation={navigation} onBack={rightProps.onBack} />
                </View>
            }
            {
                rightProps.right &&
                <HeaderRight onPress={rightProps.onPress} navigation={navigation} />
            }
        </SafeAreaView>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    safeAreaViewStyle: { alignItems: "center", flexDirection: "row", padding: 5, justifyContent: "space-between" },
    safeAreaViewRightStyle: { alignItems: "center", flexDirection: "row", padding: 5, justifyContent: "flex-end" }

})