import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: 100,
            height: 100,
            marginBottom: 30,
            backgroundColor: '#3897f0'
        },
        input: {
            width: '90%',
            height: 50,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginVertical: 10,
            backgroundColor: theme.colors.background,
            color: '#333'
        },
        loginButton: {
            backgroundColor: '#3897f0',
            width: '90%',
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
        },
        loginText: {
            fontWeight: 'bold',
            fontSize: 16
        },
        forgotPassword: {
            color: '#3897f0',
            marginTop: 15,
            fontSize: 14
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            marginVertical: 20
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: '#ddd'
        },
        orText: {
            marginHorizontal: 10,
            color: '#888',
            fontWeight: 'bold'
        },
        fbButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
        },
        fbText: {
            color: '#3897f0',
            fontWeight: 'bold',
            fontSize: 16
        },
        signupContainer: {
            flexDirection: 'row',
            marginTop: 20
        },
        signupText: {
            color: '#888'
        },
        signupLink: {
            color: '#3897f0',
            fontWeight: 'bold'
        }
    });