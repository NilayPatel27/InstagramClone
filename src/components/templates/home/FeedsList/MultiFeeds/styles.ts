import { StyleSheet } from "react-native";

export const createStyles = (theme: any, width: any) =>
    StyleSheet.create({
        imageContainer: {
            aspectRatio: 1,
            backgroundColor: theme.colors.background,
            marginBottom: 10,
            width
        },
        image: {
            aspectRatio: 1,
            marginVertical: 5,
            width
        },
        counterContainer: {
            position: "absolute",
            backgroundColor: theme.colors.darkGray,
            borderRadius: 10,
            padding: 5,
            top: 10,
            right: 10
        },
        counterText: {
            color: theme.colors.background,
            fontWeight: "bold"
        }
    });