// StoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Story: { story: string };
};

type StoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Story'>;

function StoryScreen({ route }: StoryScreenProps) {
  const { story } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.storyText}>{story}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  storyText: {
    fontSize: 20,
    lineHeight: 24,
  },
});

export default StoryScreen;
