import { useContext, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsContext } from '../context/PermissionsContext';


export const useGeoLocation=()=>{

    const {permissions} = useContext(PermissionsContext);

    const[latitude, setLatitude]=useState(0);
    const[longitude, setLongitude]=useState(0);
    const[isLoading, setIsLoading] = useState(true)


    if(permissions.locationStatus === "granted") {
        Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsLoading(false);
        },
        error => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Timeout for getting the location
          maximumAge: 10000, // Maximum age of cached location
        },
      );
    }
      
      return {
        latitude, longitude, isLoading
      }
}

