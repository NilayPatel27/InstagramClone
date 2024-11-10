import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpTemplate = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');

  const handleUserNameChange = (text: string) => {
    setUserName(text.toLowerCase());
  }

  const handleNextPress = () => {
    console.log('username', username);
    navigation.navigate('CreatePasswordPage', { username: username });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Choose username</Text>
      <Text style={styles.text2}>You can always change it later.</Text>
      <TextInput
        style={styles.userNameInput}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={handleUserNameChange}
        keyboardType="name-phone-pad"
      />
      <TouchableOpacity
        onPress={handleNextPress}
        style={styles.nextButtonContainer}
        disabled={username.length < 1}>
        <Text style={[styles.nextButtonText, { color: username.length < 1 ? '#99b7f3' : '#fff', }]}>Next</Text>
      </TouchableOpacity>
    </View >
  )
}

export default SignUpTemplate

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
  userNameInput: {
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