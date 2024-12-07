import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useContext, useEffect, useState } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context/index.tsx';
import { useCustomTheme, useUserLogin } from '@instagram/customHooks/index.tsx';
import { createStyles } from '@instagram/components/templates/auth/login/styles';

const LoginTemplate = () => {

  const { theme } = useCustomTheme();
  const styles = createStyles(theme);

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