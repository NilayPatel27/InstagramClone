import React, { useEffect, useState } from 'react'
import AuthStack from '@instagram/navigation/authNavigation';
import HomeStack from '@instagram/navigation/homeNavigation';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Loader } from '@instagram/components/atoms';
import { getAccess, setAccess } from '@instagram/customHooks/useAccess';

const RootNavigation = () => {

  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<any>(null);

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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      try {
        if (allKeys.includes("userToken")) {
          await getAccess("userToken").then((token) => {
            setUserToken(token);
          }).catch((e) => {
            setAccess("userToken", null);
            setAccess("user", null);
          }).finally(() => {
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isLoading) checkLoginStatus();
  }, [isLoading]);

  return (
    isLoading ? <></> :
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            {
              userToken ? (
                <>
                  <Stack.Screen name="HomeStack" component={HomeStack} />
                  <Stack.Screen name="AuthStack" component={AuthStack} />
                </>
              ) : (
                <>
                  <Stack.Screen name="AuthStack" component={AuthStack} />
                  <Stack.Screen name="HomeStack" component={HomeStack} />
                </>
              )
            }
          </Stack.Navigator>
          <Loader visible={isLoading} />
        </NavigationContainer>
      </>
  )
}

export default RootNavigation;