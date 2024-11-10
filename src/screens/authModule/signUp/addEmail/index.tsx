import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AddEmailPageTemplate } from '@instagram/components/templates/auth'
import { useRoute } from '@react-navigation/native';

const AddEmailPage = () => {
    const route = useRoute();
    const { username, password }: any = route.params;
    return (
        <AddEmailPageTemplate username={username} password={password} />
    )
}

export default AddEmailPage;

const styles = StyleSheet.create({})