import { View } from 'react-native';
import React, { useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppContext } from '@instagram/context/index.tsx';
import { LoaderComponent } from '@instagram/components/atoms/index.tsx';
import { LoginPage, SignUpPage, CreatePasswordPage, AddEmailPage } from '@instagram/index';

const AuthStack = () => {
    const screenOptions = {
        headerShown: false,
        headerTintColor: "#fff",
        headerStyle: {
            backgroundColor: '#2c2e3b',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 30,
        }
    };
    const Stack = createNativeStackNavigator();

    const { state: AppState } = useContext(AppContext);

    return (
        <View style={{ flex: 1, zIndex: 1 }}>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName='LoginPage'>

                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="SignUpPage" component={SignUpPage} />
                <Stack.Screen name="CreatePasswordPage" component={CreatePasswordPage} />
                <Stack.Screen name="AddEmailPage" component={AddEmailPage} />

            </Stack.Navigator>
            {AppState?.Loader?.loaderVisible === true && (
                <LoaderComponent />
            )}
        </View>
    )
}

export default AuthStack;