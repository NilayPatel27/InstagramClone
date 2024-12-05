import { useForm } from "react-hook-form";
import React, { useCallback, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, TouchableOpacity, View } from 'react-native';

import { Loader } from '@instagram/components/atoms';
import { EmailInput } from "@instagram/components/molecules";
import { EmailValidationSchema } from "@instagram/validations";
import { useSignUp, useUserEmailExist } from '@instagram/customHooks';

import { styles } from "@instagram/components/templates/auth/signUp/addEmail/styles.ts";
import { AddEmailProps, FormValues } from "@instagram/components/templates/auth/signUp/addEmail/types.ts";

const AddEmail: React.FC<AddEmailProps> = ({ username, password }) => {

    const [email, setEmail] = useState<string>('');

    const handleEmailChange = useCallback((text: string) => {
        setEmail(text?.toLowerCase());
    }, []);

    const handleSignUp = async () => {
        await signUp({ email, name: "", password, userName: username, profileImage: "" });
    }

    const { signUp, signUpLoading } = useSignUp();

    const { userEmailExist, validateEmailLoading } = useUserEmailExist({ handleSignUp });

    const handleNextPress = async () => {
        await userEmailExist({ email });
    }

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(EmailValidationSchema),
        reValidateMode: "onChange"
    });

    const isDisabled = email?.length < 1;

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Add an Email</Text>
            <EmailInput control={control} errors={errors} handleEmailChange={handleEmailChange} email={email} />
            <TouchableOpacity
                onPress={handleSubmit(handleNextPress)}
                style={styles.nextButtonContainer}
                disabled={isDisabled}>
                <Text style={[styles.nextButtonText, { color: isDisabled ? '#99b7f3' : '#fff', }]}>Sign Up</Text>
            </TouchableOpacity>
            <Loader visible={validateEmailLoading || signUpLoading} />
        </View >
    )
}

export default AddEmail;