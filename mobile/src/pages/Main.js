import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import {connect, disconnect, subscribeToNewDevs} from '../services/socket';

function Main({ navigation }) {

  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [ techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
    loadInitialPosition();
  }, []);

  useEffect(() => {

    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  
  }, [devs])
  
  function setupWebsocket(){
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs, 
    );

  }

  async function loadDevs(){
    
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setupWebsocket();
    setDevs(response.data.devs); 
  }


  function handleRegionChanged(region){
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }


  return (
    <>
      <MapView 
      onRegionChangeComplete={handleRegionChanged}
      initialRegion={currentRegion} 
      style={styles.map}
      >
        {
        devs.map(dev => (
          <Marker
          key={dev._id} 
          coordinate={{ 
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1], 
            }}>
            <Image 
              style={styles.avatar} 
              source={{ uri: dev.avatar_url }} 
            />
            <Callout tooltip={true} onPress={()=> {
              navigation.navigate('Profile', { github_username: dev.github_username})
            }} >
              <View style={styles.calloutContainer}>
                <View style={styles.callout}>
                  <Text style={styles.devName}>{dev.name}</Text>
                  <Text style={styles.devBio}>{dev.bio}</Text>
                  <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
              </View>
              <View style={styles.calloutIndicator} />
            </Callout>
          </Marker>
        ))
        }
      </MapView>

      
        <View style = {styles.searchForm}>
          <TextInput style ={styles.searchImput} 
          placeholder ='Search devs by techs...'
          placeholderTextColor ='#aaa'
          autoCapitalize = "words"
          autoCorrect = {false}
          value={techs}
          onChangeText = {setTechs}

          />

          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name='my-location' size={20} color='#FFF' />
          </TouchableOpacity>
        </View>
    </>
  )

}
export default Main;


const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e84d49',
    resizeMode: 'cover',

  },
  calloutContainer: {
    backgroundColor: '#37515C',
    padding: 0,
    borderRadius: 4,
    borderBottomWidth: 4,
    borderBottomColor: '#e84d49',
    alignSelf: 'center',
  },
  calloutIndicator: {
    alignSelf: 'center',
    top: -4,
    width: 0,
    height: 0,
    borderTopColor: '#e84d49',
    borderRightWidth: 13,
    borderTopWidth: 26,
    borderRightColor: 'transparent',
    borderLeftWidth: 13,
    borderLeftColor: 'transparent'
  },
  callout: {
    padding: 5,
    margin: 10,
    width: 250,
    backgroundColor: '#42616e',
    borderRadius: 8,
    //borderBottomWidth: 3,
    //borderBottomColor: '#e84d49',
    alignSelf: 'center',

  },
  devName: {
    fontWeight: 'bold',
    color: '#FFF', 
    fontSize: 16,
  },
  devBio: {
    color: '#ccc',
    marginTop: 5,
  },
  devTechs: {
    color: '#fa9579ec',
    marginTop: 5,
  },
  searchForm:{
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
    backgroundColor: '#37515C',
    borderRadius: 25,
  },
  searchImput:{
    flex: 1,
    height: 50,
    backgroundColor: '#42616e',
    color: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 4,


  },
  loadButton:{
    width: 50,
    height: 50,
    backgroundColor: '#e84d49',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  
});
