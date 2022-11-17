
import {React,useEffect,useState} from 'react';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


  const StyledView = styled.View`
  background-color: black;
`

const StyledText = styled.Text`
  color: white;
`


function Home() {
    const isDarkMode = useColorScheme() === 'dark';

    const [data,setData] = useState({});
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    };
  
  
  
    const getData=()=>{
  
      axios.post('https://api.dropboxapi.com/2/files/list_folder',{
        "path": "/PrasannaDrop/"
      },
      {
        headers: {
         
              'Content-Type': 'application/json',
              'Authorization':'Bearer sl.BTM3CkaALS09jg5o3TJE8Hw1KrCgtgh_UhPunA9-SAu2HqzX9qkSEX27HgxPhDPpJHVuggSW4AHWShdQl-kixFO2Usd0Ujk7Xx36Hd9axBsOXlKuOsPGsQFpsK5Pzzp2f5W1IKS5U0mf'
        },
  
        
      }
      )
      .then(function (response) {
        console.log(response.data);
        setData(response.data.entries)
      })
      .catch(function (error) {
        console.log('Error is :'+ error);
      });
  
     
    }
  
    useEffect(()=>{
    //   getData();
    },[])
  
    return(
<SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
      
        style={[backgroundStyle,{flex:1}]}>
        
     
        <StyledText>Hello World!</StyledText>
      
      </View>
    </SafeAreaView>

    )


}

export default Home;