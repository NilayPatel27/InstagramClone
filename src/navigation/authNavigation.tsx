import React from 'react'
import { LoginPage, SignUpPage } from '@instagram/index';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


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

        </Stack.Navigator>
    )
}

export default AuthStack;