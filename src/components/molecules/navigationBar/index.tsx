import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { HeaderRight, HeaderLeft } from '@instagram/components/atoms/index.tsx';

interface NavigationBarProps {
    rightProps: { onBack: any, back: boolean, right: boolean, onPress: any, text?: any, postButton?: boolean };
    navigation: any;
}

const NavigationBar = ({ rightProps, navigation }: NavigationBarProps) => {
    return (
        <SafeAreaView style={rightProps.right ? styles.safeAreaViewRightStyle : styles.safeAreaViewStyle}>
            {
                rightProps.back &&
                <View style={{ alignItems: "center", flexDirection: "row", padding: 5, paddingVertical: 8, width: '100%' }}>
                    <HeaderLeft navigation={navigation} onBack={rightProps.onBack} />
                    {rightProps.text && <Text style={{ color: 'black', fontSize: 20, marginLeft: 15 }}>{rightProps.text}</Text>}
                </View>
            }

            {
                rightProps.right &&
                <HeaderRight onPress={rightProps.onPress} navigation={navigation} postButton={rightProps.postButton} />
            }
        </SafeAreaView>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    safeAreaViewStyle: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
    safeAreaViewRightStyle: { alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }
})