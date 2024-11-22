import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Images } from '@instagram/assets';
import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from '@instagram/components/molecules';
import { useUserData } from '@instagram/customHooks';

const EditPorfileTemplate = () => {

    const navigation = useNavigation();

    const onBack = () => {
        navigation.goBack()
    }
    const { userData } = useUserData();

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <NavigationBar rightProps={{ back: true, right: false, onBack, text: "Edit Profile" }} navigation={navigation} />
            <View style={styles.imageContainer}>
                {
                    userData?.user?.profileImage ?
                        <Image source={{ uri: userData?.user?.profileImage }} style={styles.userImage} /> :
                        <Image source={Images.User} style={styles.userImage} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
});

export default EditPorfileTemplate