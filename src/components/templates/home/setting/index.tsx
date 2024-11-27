import React, { useContext, useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { usePrevious } from '@instagram/customHooks';
import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context';
import { getAccess } from '@instagram/customHooks/useAccess';
import { NavigationBar } from '@instagram/components/molecules';

const SettingTemplate = () => {
    const navigation = useNavigation();

    const { state: AppState, logOutRequest, deleteUserAccountRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

    interface UserData {
        token: string;
        user: {
            _id: string;
            name: string;
            email: string;
            message: string;
        }
    }

    const [userData, setUserData] = useState<UserData>({});
    const [deleteUserAccountLoading, setDeleteUserAccountLoading] = useState(false);

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
    const getUserData = async () => {
        const userData: any = await getAccess("user");
        setUserData(JSON.parse(userData));
    }

    useEffect(() => {
        getUserData();
    }, []);

    const deleteUserAccount = () => {
        setDeleteUserAccountLoading(true);
        deleteUserAccountRequest(userData?.user?._id);
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

    useEffect(() => {
        if (deleteUserAccountLoading && AppState?.Auth && AppState?.Auth?.deleteUserAccountSuccess === true && AppState?.Auth?.deleteUserAccountResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserAccountLoading(false);
                if (AppState?.Auth?.deleteUserAccountResponse?.status === "Success" || AppState?.Auth?.deleteUserAccountResponse?.status === 200) {
                    logOutRequest();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "AuthStack" }]
                        }));
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.deleteUserAccountResponse?.message ? AppState?.Auth?.deleteUserAccountResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
        } else if (deleteUserAccountLoading && AppState?.Auth && AppState?.Auth?.deleteUserAccountSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserAccountLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [deleteUserAccountLoading, AppState?.Auth?.deleteUserAccountSuccess, AppState?.Auth?.deleteUserAccountResponse, AppState?.Auth?.error]);

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