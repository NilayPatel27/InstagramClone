import * as React from 'react';

import AuthStack from '@instagram/navigation/authNavigation';
import HomeStack from '@instagram/navigation/homeNavigation';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Loader } from '@instagram/components/atoms';

const RootNavigation = () => {

  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<any>(null);

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

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await AsyncStorage.getItem('userToken').then((token) => {
          setUserToken(token);
          setIsLoading(false);
        });
      } catch (e) {
        console.error("Failed to fetch user token:", e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
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
  )
}

export default RootNavigation;