import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { HeaderRight, HeaderLeft } from '@instagram/components/atoms/index.tsx';
interface NavigationBarProps {
    rightProps: { onBack: any, back: boolean, right: boolean, onPress?: any, text?: any, postButton?: boolean, menuButton?: boolean, uploadButton?: boolean }
    navigation: any
    userName?: string
}

const NavigationBar = ({ rightProps, navigation, userName }: NavigationBarProps) => {
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            {
                rightProps.back &&
                <View style={{ alignItems: "center", flexDirection: "row", padding: 5, paddingVertical: 8 }}>
                    <HeaderLeft navigation={navigation} onBack={rightProps.onBack} />
                    {rightProps.text && <Text style={{ color: 'black', fontSize: 20, marginLeft: 15, fontWeight: '500' }}>{rightProps.text}</Text>}
                </View>
            }

            {
                userName &&
                <View style={{ alignItems: "center", flexDirection: "row", padding: 5, paddingVertical: 8 }}>
                    <Text style={{ color: 'black', fontSize: 20, marginLeft: 15, fontWeight: '500' }}>{userName}</Text>
                </View>
            }

            {
                rightProps.right &&
                <HeaderRight onPress={rightProps.onPress} navigation={navigation} postButton={rightProps.postButton} menuButton={rightProps.menuButton} uploadButton={rightProps.uploadButton} />
            }
        </SafeAreaView>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    safeAreaViewStyle: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", backgroundColor: 'white' }
})