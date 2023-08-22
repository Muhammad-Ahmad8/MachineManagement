import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Store/Store';
import HomeScreen from './src/Screens/HomeScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
