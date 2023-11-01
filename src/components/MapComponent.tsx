import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import Leaflet, { Layers, Markers, TileOptions } from 'react-native-leaflet-ts';
import { useGeoLocation } from '../hooks/useGeoLocation';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';


export const MapComponent = () => {

const{latitude, longitude, isLoading} = useGeoLocation();


console.log(latitude, longitude)

const markerList: Markers[] = [


];

const options: TileOptions = {
  noWrap: true,
  detectRetina: true,
};

const mapLayers: Layers[] = [
  {
    name: 'Floor 1',
    src: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    tileOptions: options,
  }
];


  return   ( 
      isLoading ? ( <ActivityIndicator size={35} color="grey" ></ActivityIndicator>) : (
           <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'http://chiflale.com.ar/' }}
          style={{ flex: 1 }}
        />
      </View>
   ) 
)


};


