import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Leaflet, { Layers, Markers, TileOptions } from 'react-native-leaflet-ts';
import { useGeoLocation } from '../hooks/useGeoLocation';


export const MapComponent = () => {

const{latitude, longitude, isLoading} = useGeoLocation();


console.log(latitude, longitude)

const markerList: Markers[] = [
  {
    latLng: [-31.460297, -64.221381],
    icon: "https://assets.stickpng.com/thumbs/5856998e4f6ae202fedf274c.png",
    iconSize: {
      width: 50,
      height: 50,
    },
    title: 'Title 1',
    disabled: true,
  },
  {
    latLng: [-31.459124, -64.225585],
    icon: "https://images.vexels.com/media/users/3/290420/isolated/preview/3d1116e8d0e9f4110ba8d070ddb8dd92-icono-de-estetoscopio-veterinario.png",
    iconSize: {
      width: 50,
      height: 50,
    },
    title: 'Title 1',
    disabled: true,
  }
  ,
  {
    latLng: [latitude, longitude],
    icon: "https://static.vecteezy.com/system/resources/previews/014/203/842/non_2x/locator-mark-of-map-and-location-pin-on-transparent-background-free-png.png",
    iconSize: {
      width: 50,
      height: 25,
    },
    title: 'Title 1',
    disabled: true,
  }

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
      isLoading ? ( <ActivityIndicator size={35} color="grey" ></ActivityIndicator>) : ( <View style={{flex:1}}>
            <Leaflet
             mapLayers={mapLayers}
            minZoom={1}
            zoom={15}
            maxZoom={20}
            flyTo={{
            latLng: [latitude, longitude ],
            zoom: 15,
            }}
            markers={markerList}/>
     </View>
   ) 
)


};
