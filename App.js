import { React, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button, TouchableOpacity, Modal, Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import FileScreen from './src/screens/File.js'
import BottomTabNavigatorScreen from './src/navigators/BottomTabNavigator.js'

const Stack = createNativeStackNavigator();
const store = configureStore();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // const [modalVisible, setModalVisible] = useState(false);



  // Display information in modal

  const modelDataDisplay = () => {

    // if (modalData[".tag"] == 'file') {
    //   return (
    //     <View>
    //       <Text style={{ color: 'black' }}>Name: {modalData.name}</Text>
    //       <Text style={{ color: 'black' }}>Modified: {modalData.client_modified}</Text>
    //       <Text style={{ color: 'black' }}>File Size: {modalData.size} kb</Text>
    //     </View>
    //   )
    // }
    // else {
    //   return (
    //     <Text style={{ color: 'black' }}>Name: {modalData.name}</Text>
    //   )
    // }


    <Text style={{ color: 'black' }}>Error</Text>

  }

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'black'
  }
});

export default App;
