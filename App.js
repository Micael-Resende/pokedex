// App.js
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavorites } from './src/store/favoritesSlice';

const App = () => {
  return (
    <Provider store={store}>
      <Initializer>
        <AppNavigator />
      </Initializer>
    </Provider>
  );
};

const Initializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites !== null) {
          dispatch(setFavorites(JSON.parse(storedFavorites)));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    loadFavorites();
  }, [dispatch]);

  return children;
};

export default App;
