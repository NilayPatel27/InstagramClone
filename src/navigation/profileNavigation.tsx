import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfilePage, SettingPage } from '@instagram/index.tsx';

const ProfileStack = () => {
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
        <Stack.Navigator screenOptions={screenOptions} initialRouteName='ProfilePage'>

            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="SettingPage" component={SettingPage} />

        </Stack.Navigator>
    )
}

export default ProfileStack;