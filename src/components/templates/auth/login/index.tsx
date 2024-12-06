import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useContext, useEffect, useState } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context/index.tsx';
import { useUserLogin } from '@instagram/customHooks/index.tsx';

const LoginTemplate = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [emailOrUserName, setEmailorUserName] = useState('');

  const { userLogin, loginLoading, firstTimeLogin } = useUserLogin();

  const { state: AppState } = useContext(AppContext);

  useEffect(() => {
    if (firstTimeLogin && !AppState?.Loader?.loaderVisible) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomeStack" }]
        }));
    }
  }, [firstTimeLogin, AppState?.Loader?.loaderVisible]);


  const handleLogin = async () => {
    await userLogin({ emailOrUserName, password });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  return (
    <>
      <View style={styles.container}>
        {/* Instagram Logo */}
        <AntDesign
          name="instagram"
          size={100}
          color={'#C13584'}
        />

        {/* Email or UserName Input */}
        <TextInput
          style={styles.input}
          placeholder="Username or email"
          placeholderTextColor="#888"
          value={emailOrUserName}
          onChangeText={setEmailorUserName}
          keyboardType="default"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()} disabled={loginLoading || !emailOrUserName || !password}>
          <Text style={[styles.loginText, { color: loginLoading || !emailOrUserName || !password ? '#99b7f3' : '#fff' }]}>Log In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => handleSignUp()}>
            <Text style={styles.signupLink}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={loginLoading} />
    </>
  );
};

export default LoginTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    backgroundColor: '#3897f0',
  },
  input: {
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
  loginButton: {
    backgroundColor: '#3897f0',
    width: '90%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#3897f0',
    marginTop: 15,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontWeight: 'bold',
  },
  fbButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fbText: {
    color: '#3897f0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#888',
  },
  signupLink: {
    color: '#3897f0',
    fontWeight: 'bold',
  },
});
