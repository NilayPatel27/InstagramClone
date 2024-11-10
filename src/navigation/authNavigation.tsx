import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName='LoginPage'>

            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="CreatePasswordPage" component={CreatePasswordPage} />
            <Stack.Screen name="AddEmailPage" component={AddEmailPage} />

        </Stack.Navigator>
    )
}

export default AuthStack;