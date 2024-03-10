import React from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CharacterItem = ({character, onCharacterChange}) => {
  const handleNameChange = (name) => {
    onCharacterChange({ ...character, name });
  };

  const handleAnimalChange = (animal) => {
    onCharacterChange({ ...character, animal });
  };
  return (
    <View style={styles.list} >
      <TextInput
        style={{ ...styles.listHeaderText, width: "100%" }}
        placeholder="Enter character name here..."
        placeholderTextColor="#A0A0A0"
        autoCorrect={false}
        maxLength={30}
        onChangeText={handleNameChange}
        value={character.name}
      />
      <LinearGradient
        colors={['transparent', '#C6CFFD', '#C6CFFD', '#C6CFFD', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientLine}
      />
      <TextInput
        style={{ ...styles.listAnimalText, width: "100%" }}
        placeholder="What animal is it..."
        placeholderTextColor="#A0A0A0"
        numberOfLines={2}
        maxLength={100}
        autoCorrect={false}
        returnKeyType="done"
        onChangeText={handleAnimalChange}
        value={character.animal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#2c2c4c',
    borderRadius: 15,
    gap: 5,
    borderWidth:.4,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 2 },
    elevation: 5, // For Android shadow effect
  },
  listHeaderText: {
    color: "#C6CFFD",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'Helvetica',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal:10,
  },
  listAnimalText: {
    color: "#C6CFFD",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: 'Helvetica',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal:10,
  
  },
  gradientLine: {
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
});

export default CharacterItem;