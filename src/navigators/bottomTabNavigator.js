import { React, useEffect, useState } from 'react';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ROOT_FOLDER} from "@env";
import {uiShowModal} from '../store/actions/ui';
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

import {useSelector, useDispatch} from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home.js'
import FileScreen from '../screens/File.js'


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
// const dbx = new Dropbox({ accessToken: 'sl.BTNM_KkQy70YxCUbKOMZEEqmyxLsQheLrPtHQmkPxf-ymeO8FtPoNzzFXTFjNNUdCwvz25TOhDq-Nr7lUbJCAbTqWZL7rHdC7CgcarYH4wbtsdZ2wcxc3nllPbEVpcCyOkmuA7cFvYwD' });



const Tab = createBottomTabNavigator();


const BottomTabNavigatorScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';


  const {modalVisible} = useSelector(
    state => state.ui,
);
const dispatch = useDispatch();


  return (


    // Bottom tab navigator

    <Tab.Navigator initialRouteName="Home" >

      <Tab.Screen name="Home" component={HomeScreen} options={{
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={26}
          />
        ),
      }} />
      <Tab.Screen name="File" component={FileScreen} initialParams={{ path:  `${ROOT_FOLDER}` }}

        options={{

          // tabBarLabel: 'Home',

          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file"
              color={color}
              size={26}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => dispatch(uiShowModal('Search feature coming soon!'))}
              >
                <MaterialCommunityIcons
                  name="card-search-outline"
                  color={'black'}
                  size={30}
                />

              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => dispatch(uiShowModal('More feature coming soon!'))}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  color={'#ffae2f'}
                  size={30}
                />

              </TouchableOpacity>

            </View>
          )

        }} />
      <Tab.Screen name="Create" component={HomeScreen} options={{
        // tabBarLabel: 'Home',

        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={26}
          />
        ),
      }} />
      <Tab.Screen name="Photo" component={HomeScreen} options={{
        // tabBarLabel: 'Home',

        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="file-image"
            color={color}
            size={26}
          />
        ),
      }} />
      <Tab.Screen name="Account" component={HomeScreen} options={{
        // tabBarLabel: 'Home',

        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account"
            color={color}
            size={26}
          />
        ),
      }} />
    </Tab.Navigator>


  );
};



export default BottomTabNavigatorScreen;
