import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { NavigationBar } from '@instagram/components/molecules/index.tsx';

const ProfileTemplate = () => {

    const navigation = useNavigation();

    const onPress = () => {
        console.log("Setting");
        navigation.navigate("SettingPage");
    }

    return (
        <NavigationBar rightProps={{ onPress, back: false, right: true, onBack: false, postButton: true }} navigation={navigation} />
    )
}

export default ProfileTemplate