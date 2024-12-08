import * as yup from "yup";
import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { useUserNameExist } from '@instagram/customHooks/index.tsx';

const SignUpTemplate = () => {

  const [username, setUserName] = useState('');

  const handleUserNameChange = (text: string) => {
    setUserName(text.toLowerCase());
  }

  const { userNameExist, userNameExistLoading } = useUserNameExist();

  const handleNextPress = async () => {
    await userNameExist({ userName: username });
  }

  const addValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username should be minimum 3 characters")
      .max(20, "Username should be maximum 20 characters")
      .matches(/^[a-zA-Z0-9._]*$/, 'Only alphanumeric characters and underscore are allowed')
  });

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(addValidationSchema),
    reValidateMode: "onChange"
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text1}>Choose username</Text>
        <Text style={styles.text2}>You can always change it later.</Text>
        <Controller
          control={control}
          defaultValue={username}
          name={"username"}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.userNameInput}
                placeholder="Username"
                placeholderTextColor="#888"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleUserNameChange(text);
                }}
                keyboardType="default"
              />
              {errors && errors["username"] && errors["username"]?.message &&
                <Text style={{ color: 'red' }}>{errors["username"]?.message}</Text>
              }
            </>

          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(handleNextPress)}
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
    paddingTop: 30
  },
  text1: {
    fontSize: 27,
    color: '#333',
    marginBottom: 10
  },
  text2: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
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
    color: '#333'
  },
  nextButtonContainer: {
    backgroundColor: '#0095f6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '90%',
    height: 50
  },
  nextButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  },
})