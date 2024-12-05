import React, { useContext } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { AppContext } from '@instagram/context';
import { Loader } from '@instagram/components/atoms';
import { useDeleteUser } from '@instagram/customHooks';
import { NavigationBar } from '@instagram/components/molecules';

const SettingTemplate = () => {
    const navigation = useNavigation();

    const { logOutRequest } = useContext(AppContext);
    const { deleteUserAccount, deleteUserAccountLoading } = useDeleteUser();

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

    const onDeletePress = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Yes",
                    onPress: () => deleteUserAccount()
                },
                {
                    text: "No",
                    onPress: () => { }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <NavigationBar rightProps={{ onPress: false, back: true, right: false, onBack, text: 'Settings' }} navigation={navigation} />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
                <Loader visible={deleteUserAccountLoading} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logoutButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#FF5252',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    }
});
export default SettingTemplate;