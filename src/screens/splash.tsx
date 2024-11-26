import { View } from 'react-native';
import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { AppLogo } from '@instagram/components/molecules';
import { getAccess } from '@instagram/customHooks/useAccess';

const Splash = () => {

    const navigation = useNavigation();

    const checkAuthStatus = async () => {

        const authToken = await getAccess("userToken");

        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: authToken ? "HomeStack" : "AuthStack",
                        }
                    ],
                })
            );
        }, 1000);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <View style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white"
        }}>
            <AppLogo />
        </View>
    )
}

export default Splash;