import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { NavigationBar } from '@instagram/components/molecules';
import { AppContext } from '@instagram/context/index.tsx';

const SettingTemplate = () => {
    const navigation = useNavigation();

    const { logOutRequest } = useContext(AppContext);

    const onBack = () => {
        navigation.goBack();
    }

    const onLogoutPress = () => {
        logOutRequest();
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
                <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => console.log('deleteButtonPress')}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logoutButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#4CAF50', // Green color for logout button
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#FF5252', // Red color for delete button
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});
export default SettingTemplate