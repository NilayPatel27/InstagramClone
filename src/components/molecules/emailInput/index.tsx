import React from 'react';
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput } from 'react-native';

const EmailInput = ({ control, errors, handleEmailChange, email }: any) => (
    <Controller
        control={control}
        defaultValue={email}
        name="email"
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
);

export default EmailInput;

const styles = StyleSheet.create({
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
    }
})