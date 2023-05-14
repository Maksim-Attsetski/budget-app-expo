import React, { memo } from 'react';

import { Navigation } from './src/widgets/App';
import { StatusBar } from 'expo-status-bar';

export default memo(function App() {
  return (
    <>
      <StatusBar style='dark' />
      <Navigation />
    </>
  );
});
