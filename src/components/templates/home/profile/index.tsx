import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Images } from '@instagram/assets';
import { NavigationBar } from '@instagram/components/molecules/index.tsx';

const ProfileTemplate = () => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SettingPage");
    }

    return (
        <>
            <NavigationBar rightProps={{ onPress, back: false, right: true, onBack: false, postButton: true }} navigation={navigation} />

            {/* profile header section */}
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={Images.Plus} style={styles.userImage} />
                </View>
                <View style={styles.countContainer}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>15</Text>
                        <Text style={styles.statLabel}>posts</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>1017</Text>
                        <Text style={styles.statLabel}>followers</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stat}>1358</Text>
                        <Text style={styles.statLabel}>following</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    statsContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    stat: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    statLabel: {
        fontSize: 14,
        color: 'black',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    postContainer: {
        flex: 1,
        aspectRatio: 1,
        margin: 2,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
});

export default ProfileTemplate