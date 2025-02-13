import * as yup from "yup";
import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreatePassword = ({ username }: any) => {

    const navigation = useNavigation();

    const [password, setUserPassword] = useState('');

    const handlePasswordChange = (text: string) => {
        setUserPassword(text);
    }

    const handleNextPress = () => {
        navigation.navigate('AddEmailPage', { username, password });
    }

    const addValidationSchema = yup.object().shape({
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one letter, one number and one special character')
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(addValidationSchema),
        reValidateMode: "onChange"
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Create a password</Text>
            <Text style={styles.text2}>For security, your password must be 6 characters or more.</Text>
            <Controller
                control={control}
                defaultValue={password}
                name={"password"}
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                handlePasswordChange(text);
                            }}
                            keyboardType="default"
                        />
                        {errors && errors["password"] && errors["password"]?.message &&
                            <Text style={{ color: 'red' }}>{errors["password"]?.message}</Text>
                        }
                    </>
                )}
            />
            <TouchableOpacity
                onPress={handleSubmit(handleNextPress)}
                style={styles.nextButtonContainer}
                disabled={password.length < 1}>
                <Text style={[styles.nextButtonText, { color: password.length < 1 ? '#99b7f3' : '#fff', }]}>Next</Text>
            </TouchableOpacity>
        </View >
    )
}

export default CreatePassword

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
    passwordInput: {
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