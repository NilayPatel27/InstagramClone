import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddEmail = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text.toLowerCase());
    }

    const handleNextPress = () => {
        console.log('validate an email', email);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Add an Email</Text>
            <TextInput
                style={styles.emailInput}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
            />
            <TouchableOpacity
                onPress={handleNextPress}
                style={styles.nextButtonContainer}
                disabled={email.length < 1}>
                <Text style={[styles.nextButtonText, { color: email.length < 1 ? '#99b7f3' : '#fff', }]}>Next</Text>
            </TouchableOpacity>
        </View >
    )
}

export default AddEmail

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
        paddingTop: 30,
    },
    text1: {
        fontSize: 27,
        color: '#333',
        marginBottom: 10,
    },
    text2: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    emailInput: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fafafa',
        color: '#333',
    },
    nextButtonContainer: {
        backgroundColor: '#0095f6',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
        height: 50,
    },
    nextButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})