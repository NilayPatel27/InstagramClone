import * as yup from "yup";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { EmailInput } from "@instagram/components/molecules";
import { useSignUp, useUserEmailExist } from '@instagram/customHooks';

const AddEmail = ({ username, password }: any) => {

    const [email, setEmail] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text.toLowerCase());
    }

    const handleSignUp = async () => {
        await signUp({ email, name: "", password, userName: username, profileImage: "" });
    }

    const { signUp, signUpLoading } = useSignUp();

    const { userEmailExist, validateEmailLoading } = useUserEmailExist({ handleSignUp });

    const handleNextPress = async () => {
        await userEmailExist({ email });
    }

    const addValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email')
            .test('is-gmail', 'Email must end with @gmail.com', (value) => {
                return value ? value.endsWith('@gmail.com') : false;
            })
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(addValidationSchema),
        reValidateMode: "onChange"
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Add an Email</Text>
            <EmailInput control={control} errors={errors} handleEmailChange={handleEmailChange} email={email} />
            <TouchableOpacity
                onPress={handleSubmit(handleNextPress)}
                style={styles.nextButtonContainer}
                disabled={email.length < 1}>
                <Text style={[styles.nextButtonText, { color: email.length < 1 ? '#99b7f3' : '#fff', }]}>Sign Up</Text>
            </TouchableOpacity>
            <Loader visible={validateEmailLoading || signUpLoading} />
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