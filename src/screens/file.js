
import {React,useEffect,useState} from 'react';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  SectionList,TouchableOpacity,Modal,Pressable
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


  const StyledText = styled.Text`
  font-size: 14;
  color: white;
  padding: 5px;
` 

const File = ({route, navigation})=> {
    const isDarkMode = useColorScheme() === 'dark';
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState('');
    const [data,setData] = useState();
    const {path} = route.params;
    
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    const onClickModel=(item)=>{
      // alert(JSON.stringify(item))
      setModalData(item)
      setModalVisible(true)

    }

    // Display information in modal

    const modelDataDisplay=()=>{

      if (modalData[".tag"]=='file'){
        return(
          <View>
            <Text style={{color:'black'}}>Name: {modalData.name}</Text>
            <Text style={{color:'black'}}>Modified: {modalData.client_modified}</Text>
            <Text style={{color:'black'}}>File Size: {modalData.size} kb</Text>
            </View>
        )
      }
      else{
        return (
          <Text style={{color:'black'}}>Name: {modalData.name}</Text>
        )
      }

    }
  
    // Get data from dropbox API

    const getData=()=>{
  
      axios.post('https://api.dropboxapi.com/2/files/list_folder',{
        "path": path
      },
      {
        headers: {
         
              'Content-Type': 'application/json',
              'Authorization':'Bearer sl.BTTtYXZvFpmHl9KxNbnhQDFOc55GEk1jHwQVpbVjmRbqgqNLGjwWWuqKjJNK0tLCtp3Rck-I5nfzvIktjYuJGgleAogAu3I4jSgb1wFFqJQfTm1CI0ztYxCSc-74qSfqM5J9yC1UxQSS'
        },
  
        
      }
      )
      .then(function (response) {
        
        // alert(JSON.stringify(response.data))
        
        const files = response.data.entries.filter(obj => {
          return obj[".tag"]==='file';
        });
        const folders = response.data.entries.filter(obj => {
          return obj[".tag"]==='folder';
        });

        let data = [{title:'Folders',data:folders},{title:'Files',data:files}]

        // alert(JSON.stringify(data))
        console.log(data);
        setData(data)
      })
      .catch(function (error) {
        console.log('Error is :'+ error);
      });
  
     
    }
  
    useEffect(()=>{
      getData();
    },[path])
  
    return(
<SafeAreaView style={[backgroundStyle,{flex:1}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            {modelDataDisplay()}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalData('')
                setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <StyledText style={{padding:5}}>{path}</StyledText>
          

{data?<SectionList
      renderItem={({item, index, section}) => item[".tag"]=='folder'?(
      
        <TouchableOpacity  activeOpacity={0.5} style={{margin:10, justifyContent:'center'}} onPress={()=>navigation.navigate('Files',{
          path:item.path_display
        })}>
       <MaterialCommunityIcons
        name="folder"
        color={'#ffae2f'}
       
        size={50}
    /><Text>{item.name}</Text>
     <TouchableOpacity  activeOpacity={0.5}  
    //  onPress={()=>navigation.navigate('Files')}
    onPress={() => onClickModel(item) 
     }
     >
       <MaterialCommunityIcons
        name="dots-horizontal"
        color={'#ffae2f'}
       
        size={30}
    />
       
      </TouchableOpacity>
       
      </TouchableOpacity>
      
      ):<View  style={{margin:10,}}><MaterialCommunityIcons
      name="file-document"
      color={Colors.white}
     
      size={50}
  /><Text>{item.name}</Text><TouchableOpacity  activeOpacity={0.5}  
  //  onPress={()=>navigation.navigate('Files')}
  onPress={() => onClickModel(item) }
   >
     <MaterialCommunityIcons
      name="dots-horizontal"
      color={'#ffae2f'}
      size={30}
  />
     
    </TouchableOpacity></View>}
      renderSectionHeader={({section: {title}}) => (
        
        <Text style={{fontWeight: 'bold', backgroundColor:'gray',padding:5}}>{title}</Text>
        
      )}
      sections={data}
      keyExtractor={(item, index) => item + index}
    />:null}

        </View>
      
    </SafeAreaView>

    )


}

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
    marginTop:20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'black'
  }
});

export default File;