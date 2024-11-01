import * as React from 'react';

import AuthStack from '@instagram/navigation/authNavigation';
import HomeStack from '@instagram/navigation/homeNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootNavigation = () => {

  const Stack = createNativeStackNavigator();

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

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName='LoginPage'>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation;