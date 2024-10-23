import { View, Text } from 'react-native'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const rootNavigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <></>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default rootNavigation;