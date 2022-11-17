import { React, useEffect, useState } from 'react';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button, TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import FileScreen from './src/screens/file.js'
import BottomTabNavigatorScreen from './src/navigators/bottomTabNavigator.js'

const Stack = createNativeStackNavigator();


function App() {
  const isDarkMode = useColorScheme() === 'dark';



  return (
    <NavigationContainer>

      {/* Stack navigator as the main navigator */}

      <Stack.Navigator>

        {/* Nesting bottom tab navigator inside stack navigator */}
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigatorScreen} options={{
          headerShown: false
        }
        } />
        <Stack.Screen name="Files" component={FileScreen}
          options={{

            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() => alert('Search feature coming soon!')}
                >
                  <MaterialCommunityIcons
                    name="card-search-outline"
                    color={'black'}
                    size={30}
                  />

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() => alert('More feature coming soon!')}
                >
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    color={'#ffae2f'}
                    size={30}
                  />

                </TouchableOpacity>
              </View>
            ),
          }} />
      </Stack.Navigator>
    </NavigationContainer>



  );
};



export default App;
