import React from "react";
import { PreferencesContext } from "@instagram/context";
import { DefaultTheme } from "@instagram/res/themConfig.ts";

const useCustomTheme = () => {
    const [isThemeDark, setIsThemeDark] = React.useState(false);

    const { isThemeDark: themeConfig }: any = React.useContext(PreferencesContext);

    let theme = DefaultTheme;

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    return { preferences, theme, isThemeDark: themeConfig };
};

export default useCustomTheme;