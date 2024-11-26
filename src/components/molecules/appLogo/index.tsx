import React from "react";
import { Image } from "react-native";

import { Images } from "@instagram/assets";
import AntDesign from 'react-native-vector-icons/AntDesign';

const AppLogo = () => {
    return (
        <>
            <AntDesign
                name="instagram"
                size={100}
                style={{ position: 'absolute', zIndex: 1 }}
                color={'#C13584'}
            />
            <Image source={Images.SplashScreen} style={{ flex: 1, resizeMode: "contain" }} />
            <Image source={Images.InstagramLogo} style={{ resizeMode: "center", position: 'absolute', zIndex: 1, height: 50, bottom: 100 }} />
        </>

    )
};

export default AppLogo;