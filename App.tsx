import React, { memo } from 'react';
import { Provider } from 'react-redux';

import { Navigation } from './src/widgets/App';
import { reduxStore } from './src/store';

export default memo(function App() {
  return (
    <Provider store={reduxStore}>
      <Navigation />
    </Provider>
  );
});
