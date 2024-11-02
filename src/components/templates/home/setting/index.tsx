import { View, Text } from 'react-native'
import React from 'react'
import { NavigationBar } from '@instagram/components/molecules'
import { useNavigation } from '@react-navigation/native'

const SettingTemplate = () => {
    const navigation = useNavigation();

    const onBack = () => {
        console.log("Back");
        navigation.goBack();
    }
    return (
        <NavigationBar rightProps={{ onPress: false, back: true, right: false, onBack }} navigation={navigation} />
    )
}

export default SettingTemplate