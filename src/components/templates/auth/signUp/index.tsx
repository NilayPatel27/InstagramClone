import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppContext } from '@instagram/context';
import { Loader } from '@instagram/components/atoms';
import { usePrevious } from '@instagram/customHooks/index.tsx';

const SignUpTemplate = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [userNameExistLoading, setUserNameExistLoading] = useState(false);

  const handleUserNameChange = (text: string) => {
    setUserName(text.toLowerCase());
  }
  const { state: AppState, userNameExistRequest } = useContext(AppContext);
  const previousAppState: any = usePrevious(AppState);


  const handleNextPress = async () => {
    setUserNameExistLoading(true);
    await userNameExistRequest({ name: username });
  }

  useEffect(() => {
    if (userNameExistLoading && AppState?.Auth && AppState?.Auth?.userNameExistSuccess === true && AppState?.Auth?.userNameExistResponse) {
      if (previousAppState?.Auth !== AppState?.Auth) {
        setUserNameExistLoading(false);
        if (AppState?.Auth?.userNameExistResponse?.data?.message === "User not exist" && AppState?.Auth?.userNameExistResponse?.status === 200) {
          navigation.navigate('CreatePasswordPage', { username: username });
        } else {
          Alert.alert(
            "Alert",
            AppState?.Auth?.userNameExistResponse?.data?.message ? AppState?.Auth?.userNameExistResponse?.data?.message : "Something went wrong",
            [
              {
                text: "OK",
                onPress: () => { }
              }
            ],
            { cancelable: false }
          );
        }
      }
    } else if (userNameExistLoading && AppState?.Auth && AppState?.Auth?.userNameExistSuccess === false && AppState?.Auth?.error) {
      if (previousAppState?.Auth !== AppState?.Auth) {
        setUserNameExistLoading(false);
        if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
          Alert.alert("", AppState?.Auth?.error?.error?.toString());
        } else {
          Alert.alert(AppState?.Auth?.error?.error)
        }
      }
    }
  }, [userNameExistLoading, AppState?.Auth?.userNameExistSuccess, AppState?.Auth?.userNameExistResponse, AppState?.Auth?.error]);


  return (
    <>
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
      <Loader visible={userNameExistLoading} />
    </>
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