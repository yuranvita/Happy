import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE ,Callout} from 'react-native-maps'
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
    id : number ;
    name : string ; 
    latitude : number ;
    longitude : number ;

}

export default function OrphanageMap(){
   
  
  const [orphanage, setOrphanage] = useState<Orphanage[]>([]);


    useFocusEffect(()=>{
        api.get('/orphanages').then(response =>{
            setOrphanage(response.data);
        });
    },)


  

    const navigation = useNavigation();

    function hundleNavigateToCreateOrphanage(){
        navigation.navigate('SelectMapPosition', );
    }

    function hendleNavigateToOrphangeDetails(id : number){
        navigation.navigate('OrphanageDetails' , {id});
    }



    return (
        <View style={styles.container}>
        <MapView
         
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 2.8246016,
          longitude : -60.6732288,
          latitudeDelta : 0.008,
          longitudeDelta : 0.008,
        }}
        >
        {orphanage.map(orphanage =>{
            return (
                <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x:2.7,
                  y:0.8,
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude : orphanage.longitude,
                }}
              >
                <Callout tooltip onPress={()=>{hendleNavigateToOrphangeDetails(orphanage.id)}}>
                  <View style = {  styles.calloutContainer}>
                        <Text style = {styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
        })}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanage.length}</Text>
          <RectButton style={styles.createOrphanageButton} onPress={hundleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#fff" />
          </RectButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    map: {
      height : Dimensions.get('window').height,
      width : Dimensions.get('window').width,
    },
  
    calloutContainer:{
      width:168 ,
      height:46,
      paddingHorizontal:16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius:16 ,
      justifyContent: 'center',
  
    },
  
    calloutText :{
      color:'#8089a5',
      fontSize: 14 ,
      fontFamily : 'Nunito_700Bold',
  
    },
  
    footer :{
      position : 'absolute',
      left : 24 ,
      right :24 ,
      bottom : 32 ,
  
      backgroundColor: '#FFF',
      borderRadius : 20,
      height :56,
      paddingLeft:24,
  
      flexDirection: 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      elevation : 3,
    },
  
    footerText : {
      color : '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton:{
      width : 56 ,
      height : 56 ,
      backgroundColor : '#15c3d6',
      borderRadius :28,
  
      justifyContent :'center',
      alignItems : 'center'
  
  
    }
  
  });