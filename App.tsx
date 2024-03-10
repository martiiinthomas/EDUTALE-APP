// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// import CreateStoryScreen from './Pages/CreateStoryScreen';
// import StoryScreen from './Pages/StoryScreen';
// import LoadStoryScreen from './Pages/LoadStoryScreen';


// type RootStackParamList = {
//   CreateStoryScreen: undefined;
//   Story: { story: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="CreateStoryScreen" component={CreateStoryScreen}
//           options={
//             {
//               title: 'Create Story',
//               headerTransparent:true,
//               headerTintColor: '#fff'
//             }
//           }
//         />
//         <Stack.Screen name="Story" component={StoryScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateStoryScreen from './Pages/CreateStoryScreen';
import StoryScreen from './Pages/StoryScreen';
import LoadStoryScreen from './Pages/LoadStoryScreen';


// Define the root stack param list
type RootStackParamList = {
  MainTab: undefined; // This is for integrating the tab navigator
  Story: { story: string };
};

// Define the tab navigator param list
type MainTabParamList = {
  CreateStoryScreen: undefined;
  LoadStoryScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Create a component for your tabs
function MainTabNavigator() {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="CreateStoryScreen" component={CreateStoryScreen} options={{ title: 'Create', headerShown: false}} />
    //   <Tab.Screen name="LoadStoryScreen" component={LoadStoryScreen} options={{ title: 'Read', headerShown: false }} />
    // </Tab.Navigator>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#272846', borderTopWidth: 0 },
        headerShown: false
      }}
    >
      <Tab.Screen name="LoadStoryScreen" component={LoadStoryScreen} options={{ title: 'Read' }} />
      <Tab.Screen name="CreateStoryScreen" component={CreateStoryScreen} options={{ title: 'Create' }} />
    </Tab.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{ headerShown: false, headerTransparent: true }} // Hide the header for the tab navigator screen
        />
        <Stack.Screen name="Story" component={StoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
