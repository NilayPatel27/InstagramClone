import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage, SignUpPage } from '@instagram/index';

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

        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation;