import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const CircularImageMarker = ({ imageUrl}:any) => {
  return (
    <View style={styles.circularMarker}>
      <Image source={{ uri: imageUrl }} style={styles.circularImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  circularMarker: {
    width: 40, // Adjust to your marker size
    height: 40, // Adjust to your marker size
    borderRadius: 20, // Half of the width and height for a circular shape
    overflow: 'hidden',
  },
  circularImage: {
    width: '100%',
    height: '100%',
  },
});

export default CircularImageMarker;