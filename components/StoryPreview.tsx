import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Story: { story: string };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

type StoryPreviewProps = {
  story: {
    title: string;
    content: string;
  };
}

const StoryPreview = ({ story }: StoryPreviewProps) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate('Story', { story: story.content })}>
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 25 }}>{story.title}</Text>
        <Text style={{ color: 'white', maxHeight: 50, fontSize: 15 }}>{story.content}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#000"
  }
});

export default StoryPreview;