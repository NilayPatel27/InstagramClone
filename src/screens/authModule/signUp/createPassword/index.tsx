import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CreatePassWordTemplate } from '@instagram/components/templates/auth'
import { useRoute } from '@react-navigation/native';

const CreatePassWord = () => {

    const route = useRoute();
    const { username }: any = route.params;

    return (
        <CreatePassWordTemplate username={username} />
    )
}

export default CreatePassWord;

const styles = StyleSheet.create({})