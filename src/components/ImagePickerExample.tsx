import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Exif from 'react-native-exif';
import ImagePicker from 'react-native-image-crop-picker'; // Import from react-native-image-crop-picker
import {GoogleSignin} from 'react-native-google-signin';
	import GDrive from 'react-native-google-drive-api-wrapper';

//In your useEffect / componentDidMount function	

export const ImagePickerExample = () => {


  useEffect(() => {
    GoogleSignin.configure({
      scopes: 4,
     webClientId:'xyz0yxa-xyzxyzxyznlpsi.apps.googleusercontent.com', 
    offlineAccess: true,
  });
}, []);

  const selectImages = () => {
    ImagePicker.openPicker({
      multiple: true, // Enable multi-select mode
      mediaType: 'photo',
    })
      .then((images) => {
        images.forEach((image) => {
          Exif.getExif(image.path)
            .then((metadata: { exif: { GPSLatitude: any; GPSLongitude: any; GPSLongitudeRef: any; GPSLatitudeRef: any; DateTime?: any; }; }) => {
              // Access metadata properties
              if (metadata.exif && metadata.exif.GPSLatitude && metadata.exif.GPSLongitude) {
              const latitude = metadata.exif.GPSLatitude;
              const longitude = metadata.exif.GPSLongitude;
              const longitudeRef = metadata.exif.GPSLongitudeRef;
              const latitudeRef = metadata.exif.GPSLatitudeRef;
              const datetime = metadata.exif.DateTime;

              console.log("datetime: " + datetime);
              console.log(convertGPSFractionalToDecimal(metadata.exif));
              }
              else{
                console.log("gps metadata not found on this photo");
              }
            })
            .catch((error: any) => {
              console.error('Error extracting metadata:', error);
            });
        });
      })
      .catch((error) => {
        console.log('Error selecting images:', error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={selectImages}>
        <Text>Select Images</Text>
      </TouchableOpacity>
    </View>
  );
};

function convertGPSFractionalToDecimal(exifData: {
  GPSLatitude: any;
  GPSLongitude: any;
  GPSLatitudeRef: any;
  GPSLongitudeRef: any;
}) {
  // Extract GPS data from the exifData object
  const { GPSLatitude, GPSLongitude, GPSLatitudeRef, GPSLongitudeRef } = exifData;

  // Split latitude and longitude parts
  const latParts = GPSLatitude.split(',').map((part: string) => parseFloat(part));
  const lonParts = GPSLongitude.split(',').map((part: string) => parseFloat(part));

  // Determine the sign for latitude and longitude based on reference (N/S, E/W)
  const latSign = GPSLatitudeRef === 'S' ? -1 : 1;
  const lonSign = GPSLongitudeRef === 'W' ? -1 : 1;

  // Calculate decimal latitude and longitude
  const degreesLat = latParts[0];
  const minutesLat = latParts[1];
  const secondsLat = latParts[2];

  const degreesLon = lonParts[0];
  const minutesLon = lonParts[1];
  const secondsLon = lonParts[2];

  // Convert fractional seconds to decimal seconds
  const decimalSecondsLat = secondsLat / 10000;
  const decimalSecondsLon = secondsLon / 10000;

  // Calculate decimal latitude and longitude
  const decimalLatitude = latSign * (degreesLat + minutesLat / 60 + decimalSecondsLat / 3600);
  const decimalLongitude = lonSign * (degreesLon + minutesLon / 60 + decimalSecondsLon / 3600);

  // Return the coordinates in the desired format
  return `${decimalLatitude.toFixed(6)}, ${decimalLongitude.toFixed(6)}`;
}
