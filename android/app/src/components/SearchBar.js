// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  const debouncedChange = debounce(onChangeText, 500);

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={colors.primary} />
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={debouncedChange}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: '#fff',
  },
});

export default SearchBar;
