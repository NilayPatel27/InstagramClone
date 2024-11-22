import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from '@instagram/components/molecules';

const EditPorfileTemplate = () => {

    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <NavigationBar rightProps={{ back: true, right: false, onBack, text: "Edit Profile" }} navigation={navigation} />
        </View>
    )
}

export default EditPorfileTemplate