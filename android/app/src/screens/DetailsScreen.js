// src/screens/DetailsScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import colors from '../styles/colors';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../src/store/favoritesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = () => {
  const route = useRoute();
  const { pokemon } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
      setDetails(response.data);
    } catch (error) {
      console.error(error);
      // Tratar erro adequadamente
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = favorites.some(p => p.id === pokemon.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(pokemon.id));
    } else {
      dispatch(addFavorite(pokemon));
    }
  };

  if (loading || !details) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const { 
    name, 
    id, 
    types, 
    abilities, 
    stats, 
    sprites, 
    moves, 
    species 
  } = details;

  const imageUrl = sprites.other['official-artwork'].front_default;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="contain"
        />
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon 
            name={isFavorite ? 'heart' : 'heart-o'} 
            size={30} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      </View>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.badgesContainer}>
          {abilities.map((abilityInfo) => (
            <View key={abilityInfo.ability.name} style={styles.badge}>
              <Text style={styles.badgeText}>{abilityInfo.ability.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        {stats.map((statInfo) => (
          <View key={statInfo.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{statInfo.stat.name.toUpperCase()}</Text>
            <Text style={styles.statValue}>{statInfo.base_stat}</Text>
          </View>
        ))}
      </View>
      {/* Evoluções e formas alternativas podem ser adicionadas aqui */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Movimentos</Text>
        <View style={styles.movesContainer}>
          {moves.slice(0, 10).map((moveInfo) => (
            <View key={moveInfo.move.name} style={styles.moveBadge}>
              <Text style={styles.moveText}>{moveInfo.move.name}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Implementar evoluções e formas alternativas conforme a PokéAPI */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },
  loader: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  id: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeText: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  badgeText: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  statName: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  moveText: {
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 12,
  },
});

export default DetailsScreen;
