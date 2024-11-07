import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { Images } from '@instagram/assets';
import { NavigationBar } from '@instagram/components/molecules/index.tsx';
import { Divider } from '@rneui/base';

const ProfileTemplate = () => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("SettingPage");
    }

    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    //Dummy data for posts
    const data = [
        { id: 1, image: Images.Back },
        { id: 2, image: Images.Remove },
        { id: 3, image: Images.Edit },
        { id: 4, image: Images.Image },
        { id: 5, image: Images.Plus },
        { id: 6, image: Images.WhitePlus },
        { id: 7, image: Images.Delete },
        { id: 8, image: Images.Hide },
        { id: 9, image: Images.HideAll },
        { id: 10, image: Images.Report },
    ];

    const screenWidth = Dimensions.get('window').width;
    const postSize = screenWidth / 3 - 2;
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
            <View style={styles.profileDescription}>
                <Text style={styles.username}>User Name</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Divider />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        margin: 1,
                        width: postSize,
                        height: postSize,
                    }}>
                        <Image source={item.image} style={styles.postImage} />
                    </View>
                )}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: 'white' }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: 'white'
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
    },
    statsContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white',
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
        color: 'black',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    userNameContainre: {
        backgroundColor: 'white',
    },
    profileDescription: {
        padding: 10,
        backgroundColor: 'white',
    },
    description: {
        fontSize: 16,
        color: 'black',
        textAlign: 'justify'
    },
});

export default ProfileTemplate