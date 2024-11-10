import { View } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppContext } from '@instagram/context/index.tsx';
import { LoaderComponent } from '@instagram/components/atoms/index.tsx';
import { ProfilePage, SettingPage, FeedUploaderPage } from '@instagram/index.tsx';

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

    const { state: AppState } = useContext(AppContext);


    return (
        <View style={{ flex: 1, zIndex: 1 }}>

            <Stack.Navigator screenOptions={screenOptions} initialRouteName='ProfilePage'>

                <Stack.Screen name="ProfilePage" component={ProfilePage} />
                <Stack.Screen name="SettingPage" component={SettingPage} />
                <Stack.Screen name="FeedUploader" component={FeedUploaderPage} />

            </Stack.Navigator>
            {AppState?.Loader?.loaderVisible === true && (
                <LoaderComponent />
            )}
        </View>
    )
}

export default ProfileStack;