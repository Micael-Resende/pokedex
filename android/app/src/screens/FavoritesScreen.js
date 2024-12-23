// src/screens/FavoritesScreen.js
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PokemonCard from '../components/PokemonCard';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites);
  const navigation = useNavigation();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum Pokémon favoritado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard 
            pokemon={item} 
            onPress={() => navigation.navigate('Details', { pokemon: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  emptyContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FavoritesScreen;
