
import { React, useEffect, useState } from 'react';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import {uiShowModal} from '../store/actions/ui';
import { useSelector, useDispatch } from 'react-redux';
import { API_TOKEN } from "@env";
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
  SectionList, TouchableOpacity, Modal, Pressable
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';

import {uiHideModal} from '../store/actions/ui';

const StyledText = styled.Text`
  font-size: 14;
  color: white;
  padding: 5px;
`
const StyledText1 = styled.Text`
  color: white;
`

const File = ({ route, navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [data, setData] = useState();
  const { path } = route.params;

  const { modalVisibleAlert,modalMessage } = useSelector(
    state => state.ui,
  );
  const dispatch = useDispatch();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onClickModel = (item) => {
    // alert(JSON.stringify(item))
    setModalData(item)
    setModalVisible(true)

  }

  // Display information in modal

  const modelDataDisplay = () => {

    if (modalData[".tag"] == 'file') {
      return (
        <View>
          <Text style={{ color: 'black' }}>Name: {modalData.name}</Text>
          <Text style={{ color: 'black' }}>Modified: {modalData.client_modified}</Text>
          <Text style={{ color: 'black' }}>File Size: {modalData.size} kb</Text>
        </View>
      )
    }
    else {
      return (
        <Text style={{ color: 'black' }}>Name: {modalData.name}</Text>
      )
    }

  }

  // Get data from dropbox API

  const getData = async() => {
    try{
    const response = await axios.post('https://api.dropboxapi.com/2/files/list_folder', {
      "path": path
    },
      {
        headers: {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },


      }
    )
      .then(function (response) {

        // alert(JSON.stringify(response.data))

        const files = response.data.entries.filter(obj => {
          return obj[".tag"] === 'file';
        });
        const folders = response.data.entries.filter(obj => {
          return obj[".tag"] === 'folder';
        });

        let data = [{ title: 'Folders', data: folders }, { title: 'Files', data: files }]
        // console.log(data);
        setData(data)
      })
    }
      catch (error) {
        Alert('Something went wrong')
        console.log('Error is :' + error);
      };


  }

  const deleteData = async() => {
    try{
    const response = await axios.post('https://api.dropboxapi.com/2/files/delete_v2', {
      "path": modalData.path_display
    },
      {
        headers: {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },


      }
    )
      .then(function (response) {

        // alert(JSON.stringify(response.data))

        // const files = response.data.entries.filter(obj => {
        //   return obj[".tag"] === 'file';
        // });
        // const folders = response.data.entries.filter(obj => {
        //   return obj[".tag"] === 'folder';
        // });

        // let data = [{ title: 'Folders', data: folders }, { title: 'Files', data: files }]
        dispatch(uiShowModal('File/Folder deleted successfully!'))
        console.log(data);
        getData();

        // setData(data)
      })
    }
      catch (error) {
        Alert('Something went wrong')
        console.log('Error is :' + error);
      };


  }

  useEffect(() => {
    // alert(API_TOKEN)
    getData();
  }, [path])

  return (
    <SafeAreaView style={{backgroundColor: isDarkMode ? Colors.black : Colors.white, flex:1}}>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleAlert}
         
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={{color:'black'}}>{modalMessage}</Text>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => 
                  //  alert(modalVisibleAlert);
                   dispatch(uiHideModal(false))   
                }
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {modelDataDisplay()}
            <Pressable
              style={[styles.button, styles.buttonRemove]}
              onPress={() => {
                deleteData()
                setModalData('')
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Remove</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
             
                setModalData('')
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View>
        <StyledText style={{ padding: 5 }}>{path}</StyledText>


        {data ? <SectionList
          renderItem={({ item, index, section }) => item[".tag"] == 'folder' ? (

            <TouchableOpacity activeOpacity={0.5} style={{ margin: 10, justifyContent: 'center' }} onPress={() => navigation.navigate('Files', {
              path: item.path_display
            })}>
              <MaterialCommunityIcons
                name="folder"
                color={'#ffae2f'}

                size={50}
              /><Text>{item.name}</Text>
              <TouchableOpacity activeOpacity={0.5}
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

          ) : <View style={{ margin: 10, }}><MaterialCommunityIcons
            name="file-document"
            color={Colors.white}

            size={50}
          /><Text>{item.name}</Text><TouchableOpacity activeOpacity={0.5}
            //  onPress={()=>navigation.navigate('Files')}
            onPress={() => onClickModel(item)}
          >
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={'#ffae2f'}
                size={30}
              />

            </TouchableOpacity></View>}
           
          renderSectionHeader={({ section: { title } }) => (

            <Text style={{ fontWeight: 'bold', backgroundColor: 'gray', padding: 5 }}>{title}</Text>

          )}
          sections={data}
          keyExtractor={(item, index) => item + index}
        /> : (<View>
          
       
          <StyledText1 style={{marginTop:50, textAlign:'center'}}>No Files!</StyledText1>
        
        </View>)}

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
    marginTop: 20
  },
  buttonRemove: {
    backgroundColor: "red",
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

export default File;