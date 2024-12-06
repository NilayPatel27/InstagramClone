import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.colors.background
        },
        imageContainer: {
            flexDirection: "row",
            backgroundColor: theme.colors.background,
            height: 50,
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%"
        },
        logoStyle: {
            width: "50%",
            height: 50,
            resizeMode: "contain",
            marginLeft: -15
        },
        listEmptyComponent: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background
        },
        noPostFoundText: {
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.black,
            position: 'absolute',
            bottom: 100,
            textAlign: 'center'
        }
    });