import React from "react";
import { useCustomTheme } from "@instagram/customHooks";

export const PreferencesContext = React.createContext({
    toggleTheme: () => { },
    isThemeDark: true,
});


export const PreferencesProvider = ({ children }: any) => {
    const { preferences } = useCustomTheme();
    return (
        <PreferencesContext.Provider
            value={preferences}>
            {children}
        </PreferencesContext.Provider>
    );
};