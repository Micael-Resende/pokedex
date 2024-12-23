// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setFavorites } from '../src/store/favoritesSlice';
import colors from '../styles/colors';

const HomeScreen = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [searchQuery, setSearchQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  const fetchPokemon = async () => {
    if (!nextUrl) return;
    setLoading(true);
    try {
      const response = await axios.get(nextUrl);
      setNextUrl(response.data.next);
      const detailedPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setPokemonList([...pokemonList, ...detailedPokemon]);
    } catch (error) {
      console.error(error);
      // Tratar erro adequadamente
    } finally {
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === '') {
      setPokemonList([]);
      setNextUrl('https://pokeapi.co/api/v2/pokemon?limit=20');
      fetchPokemon();
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemonList([response.data]);
      setNextUrl(null);
    } catch (error) {
      console.error(error);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByType = async (type) => {
    setSelectedType(type);
    setLoading(true);
    try {
      if (type === null) {
        setPokemonList([]);
        setNextUrl('https://pokeapi.co/api/v2/pokemon?limit=20');
        fetchPokemon();
        return;
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.name}`);
      const pokemonData = await Promise.all(
        response.data.pokemon.slice(0, 100).map(async (p) => {
          const res = await axios.get(p.pokemon.url);
          return res.data;
        })
      );
      setPokemonList(pokemonData);
      setNextUrl(null);
    } catch (error) {
      console.error(error);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 20 }} color={colors.primary} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar 
        value={searchQuery} 
        onChangeText={handleSearch} 
        placeholder="Buscar Pokémon"
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            selectedType === null && styles.filterButtonActive
          ]}
          onPress={() => handleFilterByType(null)}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <FlatList 
          data={types}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                selectedType?.name === item.name && styles.filterButtonActive
              ]}
              onPress={() => handleFilterByType(item)}
            >
              <Text style={styles.filterText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && pokemonList.length === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList 
          data={pokemonList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard 
              pokemon={item} 
              onPress={() => navigation.navigate('Details', { pokemon: item })}
            />
          )}
          onEndReached={fetchPokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: '#fff',
    textTransform: 'capitalize',
  },
});

export default HomeScreen;
