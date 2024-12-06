import { colors } from "react-native-elements";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const additionalColors = {
    transparent: "transparent",
    lightgray: "#F3F4F7",
    lightgray2: "#F6F6F6",
    lightgray3: "rgb(234,237,238)",
    gray2: "rgb(161,173,178)",
    headerFont: "rgb(53,78,90)",
    gray: "rgb(222,226,228)",
    yellow: "rgb(247,181,0)",
    darkgreen: "rgb(0,190,71)",
    lightGreen: "rgb(214,248,227)",
    black1: "rgb(53,78,90)",
    semiTransparentblack: "rgba(0,0,0,0.5)",
    background: "#FFF",
    navigationIconColor: "#FFFFFF",
    green: "#00cc00",
    splashBackground: "rgb(43, 64, 105)",
    offWhite: "#F8F8F8",
    gray3: "#A3A3A3",
    textColor: "rgb(28, 28, 30)",
    drawerSelectionColor: "#6ECAB5",
    checkBox: "rgb(147,192,31)",
    greenButton: "rgb(147,192,31)",
    blueButton: "#00B4E5",
    red: "#cc0000",
    darkGray: "#4a4a4a",
    stepIndicatorGray: "#777777",
    ratingYellow: "#F3A821",
    green2: "#94BD26",
    onlineYellow: "#EDBA35",
    offlineRed: "#FE2E2E",
    lightSecondary: "#7FDAF2",
    headerTitle: "#484848",
    orange: "rgb(246,163,1)",
    lightGreenButton: "rgba(147,192,31,0.5)",
    purple1: "#BD10E0",
    interactionsMajor: "#f91e48",
    interactionsModerate: "#f28941",
    interactionsMinor: "#efb662",
    blackOpacity: "rgba(28, 28, 30, 0.6)",
    blueButtonWithOpacity: "rgba(0, 180,229,0.4)",
    warningred: "#e35256",
    loaderColor: "rgba(52, 52, 52, 0.6)",
    chatTint: "#222B45",
    skyBlue: "rgba(0, 180, 229)",
    greenHighLight: "rgb(147,191,31)",
    greenHighLight1: "rgb(185, 209, 112)",
    skyBlue4: "rgb(0, 180, 229)",
    completeGreen: "rgb(154, 205, 50)",
    onboardingHeaderColor: "rgb(0, 180, 229)",
    onboardingTransparent: "rgba(0, 0, 0, 0.7)",
    onboardingGreen: "rgb(147, 191, 31)",
    richTextBackground: "#f2f2f2",
    registerCompleteGreen: "#A29F30",
    brown: "#765341",
    ...colors
};

export const instagramFonts = {
    regular: "MinionPro-Regular",
    light: "MinionPro-Regular",
    bold: "MyriadPro-Bold",
    medium: "MyriadSetPro-Semibold",
    mediumItalic: "MyriadPro-SemiboldIt",
    lightItalic: "MyriadPro-LightIt",
    boldItalic: "MyriadPro-BoldIt",
    italic: "MyriadPro-It",
};

const DefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...additionalColors,
        primary: "#2b515c",
        secondary: "#0e9ec1",
        background: "#FFF",
        blueButton: "#00B2B4",
        splashBackground: "#29515D",
        buttonColor: "#94BD26"
    },
    fonts: instagramFonts,
    Input: {
        // inputStyle: { backgroundColor: "yellow" }
    },
    Text: {
        style: { fontSize: 11.5, color: additionalColors.textColor, fontFamily: instagramFonts.light }
    },
    Button: {
    },
};

export { DefaultTheme };