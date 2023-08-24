import React from 'react';
import { View } from 'react-native';
import Leaflet, { Layers, Markers, TileOptions } from 'react-native-leaflet-ts';

const markerList: Markers[] = [
  {
    latLng: [-31.432919, -64.166255],
    iconSize: {
      width: 25,
      height: 25,
    },
    title: 'Title 1',
    disabled: true,
  },
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
  },
];

const MapComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <Leaflet
        mapLayers={mapLayers}
        minZoom={1}
        zoom={15}
        maxZoom={20}
        flyTo={{
          latLng: [-31.432919, -64.166255],
          zoom: 15,
        }}
        markers={markerList}
      />
    </View>
  );
};

export default MapComponent;
