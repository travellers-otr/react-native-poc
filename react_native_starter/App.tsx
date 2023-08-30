import React from 'react';
import {Text} from 'react-native';
import { MapComponent } from './src/components/MapComponent';
import { PermissionsProvider } from './src/context/PermissionsContext';

const App = () => {
  return(
  <AppState>
  <MapComponent/>
  </AppState> 
  )
};

export default App;

const AppState = ({ children }: any) =>{

  return (
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )

}
