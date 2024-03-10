import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator  } from 'react-native';
import CharacterItem from '../components/CharacterItem';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStory } from '../functions/createStory';

type RootStackParamList = {
  Story: { story: string };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;


export default function CreateStoryScreen({ navigation }: HomeScreenProps) {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('')
  const [characters, setCharacters] = useState([
    {
      name: '',
      animal: ''
    }
  ])

  const handleCreateStory = async () => {
    await createStory({ setLoading, navigation, location, characters });
  };

  const handleCharacterChange = (index: number, updatedCharacter: { name: string; animal: string; }) => {
    setCharacters(characters => {
      const newCharacters = [...characters];
      newCharacters[index] = updatedCharacter;
      return newCharacters;
    });
  };

  const handleCharacterDelete = (index: number) => {
    setCharacters(characters => {
      const newCharacters = [...characters];
      newCharacters.splice(index, 1)
      return newCharacters;
    });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#1C1D3B" }}>
        <ActivityIndicator size="large" />
        <Text>Generating story...</Text>
        <TouchableOpacity style={styles.createStoryButton} 
          onPress={() => setLoading(false)}
          >
            <Text style={styles.createStoryButtonText}>Cancel</Text>
          </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
    style={{ flex: 1, backgroundColor: "#1C1D3B" }}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
            <View style={styles.container}>
              <View style={{ paddingVertical: 20 }}>
                <Text style={styles.text}>Story Location</Text>
                <View style={styles.storyText}>
                  <TextInput
                    style={{ ...styles.input, paddingHorizontal: 20, width: "100%" }}
                    onChangeText={(text) => (setLocation(text))}
                    value={location}
                    placeholder="Enter where your story take place..."
                    placeholderTextColor="#A0A0A0"
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={styles.text}>Add Characters</Text>
                <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={ () => {
                    // console.log(characters)
                    setCharacters((prev) => [...prev, { name: '', animal: '' }])
                    }
                  }>
                    <AntDesign name="pluscircle" size={35} color="#5356ad" style={{ shadowOpacity: .5, shadowColor: "black", shadowOffset: { width: 0, height: 1 } }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ gap: 10 }}>
                {characters?.map((character, index) => {
                  return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <CharacterItem character={character} onCharacterChange={(updatedCharacter: { name: '', animal: '' }) => handleCharacterChange(index, updatedCharacter)} />
                      <TouchableOpacity onPress={() => handleCharacterDelete(index)}>
                        <MaterialCommunityIcons name="delete-circle-outline" size={30} style={{ paddingRight: 0 }} color="red" />
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.createStoryButton} 
          onPress={handleCreateStory}
          >
            <Text style={styles.createStoryButtonText}>Create Story</Text>
          </TouchableOpacity>


        </SafeAreaView>
    </View> //ImageBackground
  );
}

const styles = StyleSheet.create({
  storyText: {
    marginTop: 20,
    // backgroundColor: "#16172f",
    backgroundColor: "#2c2c4c",
    borderRadius: 15,
    gap: 5,
    borderWidth: .4,
    shadowColor: "black",
    // shadowOpacity: 0.7, // Adjusted for more subtle shadow
    shadowRadius: 1, // Radius of the shadow
    shadowOffset: { width: 1, height: 2 }, // Adjust the offset of the shadow
    elevation: 5, // For Android shadow effect
  },
  gradient: {
    flex: 1,
    // backgroundColor: '#1C1D3B',//uncomment if you want to get rid of pattern
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 20,
    paddingBottom: 0

  },
  text: {
    // color: '#C6CFFD',
    color: '#e0e0e0',
    fontSize: 25,
    fontFamily: 'Helvetica',
    fontWeight: '500'
  },
  textHeader: {
    // color: '#C6CFFD',
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Helvetica',
  },
  input: {
    borderColor: "#030406", // Border color
    paddingVertical: 15,
    color: '#C6CFFD', // Text color
    fontWeight: "500",
    fontSize: 20, // Increase font size for clarity
    fontFamily: 'Helvetica',

  },
  createStoryButton: {
    // position: 'absolute',
    // bottom: 65,
    // left: 0,
    // right: 0,
    backgroundColor: '#5356ad',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 5,
    marginBottom:30 // For Android shadow
  },
  createStoryButtonText: {
    // color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  gradientLine: {
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
});
