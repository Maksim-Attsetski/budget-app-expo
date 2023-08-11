import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Navigation } from './src/widgets/App';
import { reduxStore } from './src/store';
import { StyleSheet } from 'react-native';

export default memo(function App() {
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <Provider store={reduxStore}>
        <Navigation />
      </Provider>
    </GestureHandlerRootView>
  );
});
