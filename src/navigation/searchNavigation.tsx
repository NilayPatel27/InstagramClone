import { View } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppContext } from '@instagram/context/index.tsx';
import { OtherUserProfile, SearchPage } from '@instagram/index.tsx';
import { LoaderComponent } from '@instagram/components/atoms/index.tsx';

const SearchStack = () => {
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

                <Stack.Screen name="SearchPage" component={SearchPage} />
                <Stack.Screen name="OtherUserProfilePage" component={OtherUserProfile} />

            </Stack.Navigator>
            {AppState?.Loader?.loaderVisible === true && (
                <LoaderComponent />
            )}
        </View>
    )
}

export default SearchStack;