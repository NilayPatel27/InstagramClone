import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { AppContext } from '@instagram/context';
import { usePrevious } from '@instagram/customHooks';

const AddEmail = ({ username, password }: any) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [validateEmailLoading, setValidateEmailLoading] = useState(false);
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [firstTimeSignUp, setFirstTimeSignUp] = useState(false);

    const { state: AppState, userEmailExistRequest, signUpRequest } = useContext(AppContext);
    const previousAppState: any = usePrevious(AppState);

    const handleEmailChange = (text: string) => {
        setEmail(text.toLowerCase());
    }

    const handleNextPress = async () => {
        setValidateEmailLoading(true);
        await userEmailExistRequest({ email });
    }

    const handleSignUp = async () => {
        setSignUpLoading(true);
        await signUpRequest({ email, name: "", password, userName: username, profileImage: "" });
    }

    useEffect(() => {
        if (validateEmailLoading && AppState?.Auth && AppState?.Auth?.userEmailExistSuccess === true && AppState?.Auth?.userEmailExistResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setValidateEmailLoading(false);
                if (AppState?.Auth?.userEmailExistResponse?.data?.message === "User not exist" && AppState?.Auth?.userEmailExistResponse?.status === 200) {
                    handleSignUp();
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.userEmailExistResponse?.data?.message ? AppState?.Auth?.userEmailExistResponse?.data?.message : "Something went wrong",
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
        } else if (validateEmailLoading && AppState?.Auth && AppState?.Auth?.userEmailExistSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setValidateEmailLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [validateEmailLoading, AppState?.Auth?.userEmailExistSuccess, AppState?.Auth?.userEmailExistResponse, AppState?.Auth?.error]);

    useEffect(() => {
        if (signUpLoading && AppState?.Auth && AppState?.Auth?.signUpSuccess === true && AppState?.Auth?.signUpResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setSignUpLoading(false);
                if (AppState?.Auth?.signUpResponse?.status === "Success" || AppState?.Auth?.signUpResponse?.status === 200) {
                    setFirstTimeSignUp(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.signUpResponse?.message ? AppState?.Auth?.signUpResponse?.message : "Something went wrong",
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
        } else if (signUpLoading && AppState?.Auth && AppState?.Auth?.signUpSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setSignUpLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [signUpLoading, AppState?.Auth?.signUpSuccess, AppState?.Auth?.signUpResponse, AppState?.Auth?.error]);

    useEffect(() => {
        if (firstTimeSignUp && !AppState?.Loader?.loaderVisible) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "HomeStack" }]
                }));
        }
    }, [firstTimeSignUp, AppState?.Loader?.loaderVisible]);

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
            <Controller
                control={control}
                defaultValue={email}
                name={"email"}
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            style={styles.emailInput}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                handleEmailChange(text);
                            }}
                            keyboardType="email-address"
                        />
                        {errors && errors["email"] && errors["email"]?.message &&
                            <Text style={{ color: 'red' }}>{errors["email"]?.message}</Text>
                        }
                    </>
                )}
            />
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