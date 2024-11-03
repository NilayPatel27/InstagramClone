import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { NavigationBar } from '@instagram/components/molecules';

const SettingTemplate = () => {
    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack();
    }

    const onLogoutPress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "AuthStack" }]
            }));
    }

    return (
        <>
            <NavigationBar rightProps={{ onPress: false, back: true, right: false, onBack, text: 'Settings' }} navigation={navigation} />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onLogoutPress()} style={styles.button}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d1d1',
    },
    text: {
        color: '#d1d1d1',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default SettingTemplate