import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomePage } from '@instagram/index.tsx';
import SearchStack from '@instagram/navigation/searchNavigation';
import ProfileStack from '@instagram/navigation/profileNavigation';

const HomeStack = () => {

    const Tab = createBottomTabNavigator();

    interface tabBarIconProps {
        focused: boolean,
        color: string,
        size: number
    }

    interface iconConfigProps {
        focusedIcon: string,
        defaultIcon: string,
        type: any
    }

    const iconConfig: { [key: string]: iconConfigProps } = {
        HomePage: { focusedIcon: 'home-sharp', defaultIcon: 'home-outline', type: Ionicons },
        SearchStack: { focusedIcon: 'search-sharp', defaultIcon: 'search-outline', type: Ionicons },
        ProfileStack: { focusedIcon: 'user-circle', defaultIcon: 'user-circle-o', type: FontAwesome },
    }

    const screenOptions = ({ route }: { route: { name: string } }) => {

        const { focusedIcon, defaultIcon, type: IconType } = iconConfig[route.name];
        return {
            tabBarIcon: ({ focused, color, size }: tabBarIconProps) => (
                <IconType
                    name={focused ? focusedIcon : defaultIcon}
                    size={25}
                    color={"#000000"}
                />
            ),
            headerShown: false,
            tabBarShowLabel: false,
        };
    };

    return (
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="SearchStack" component={SearchStack} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default HomeStack