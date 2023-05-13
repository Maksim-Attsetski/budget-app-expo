import React, { memo } from 'react';
import { StatusBar } from 'react-native';

import { Navigation } from './src/widgets/App';

export default memo(function App() {
  return (
    <>
      <StatusBar barStyle='light-content' />
      <Navigation />
    </>
  );
});
