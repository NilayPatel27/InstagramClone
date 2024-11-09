import React from 'react';

import { AppProvider } from '@instagram/context/index.tsx';
import RootNavigation from '@instagram/navigation/rootNavigation';

const App = () => {
  return (
    <>
      <AppProvider>
        <RootNavigation />
      </AppProvider>
    </>
  )
};

export default App;