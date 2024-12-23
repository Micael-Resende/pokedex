// src/components/PokemonCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const PokemonCard = ({ pokemon, onPress }) => {
  const { name, id, sprites, types } = pokemon;
  const imageUrl = sprites.other['official-artwork'].front_default;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
        <Text style={styles.id}>#{id.toString().padStart(3, '0')}</Text>
        <View style={styles.typesContainer}>
          {types.map((typeInfo) => (
            <View 
              key={typeInfo.type.name} 
              style={[styles.typeBadge, { backgroundColor: colors.types[typeInfo.type.name] || colors.primary }]}
            >
              <Text style={styles.typeText}>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  id: {
    fontSize: 14,
    color: '#ccc',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
  },
  typeText: {
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 12,
  },
});

export default PokemonCard;
