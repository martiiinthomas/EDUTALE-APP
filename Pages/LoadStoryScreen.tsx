import React, { useCallback , useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoryPreview from '../components/StoryPreview';
import { useFocusEffect } from '@react-navigation/native';

interface Story {
  title: string;
  content: string;
}

// const LoadStoryScreen: React.FC = () => {
function LoadStoryScreen(){
  const [stories, setStories] = useState<Story[]>([]);

  const retrieveStories = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const loadedStories = result.map(([key, value]) => {
        if (key.startsWith('story_') && value) {
          return JSON.parse(value) as Story;
        }
      }).filter(Boolean) as Story[];
      setStories(loadedStories);
    } catch (error) {
      console.error('Error retrieving stories', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      retrieveStories();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#1C1D3B" }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            {stories.length > 0 ? (stories.map((story, index) => (
              <View key={index}>
                <StoryPreview story={story}></StoryPreview>
              </View>
            ))) : (
              <View>
                <Text style={{ color: 'white', textAlign: 'center' }}>Please go create a story.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 0,
  },
  safeArea: {
    flex: 1,
  },
});

export default LoadStoryScreen;
