import React from 'react';
import { ThemeProvider } from '@rneui/themed';

import { useCustomTheme } from '@instagram/customHooks';
import RootNavigation from '@instagram/navigation/rootNavigation';
import { AppProvider, PreferencesProvider } from '@instagram/context/index.tsx';

const App = () => {
  const { theme }: any = useCustomTheme();

  return (
    <>
      <AppProvider>
        <PreferencesProvider>
          <ThemeProvider theme={theme}>
            <RootNavigation />
          </ThemeProvider>
        </PreferencesProvider>
      </AppProvider>
    </>
  )
};

export default App;