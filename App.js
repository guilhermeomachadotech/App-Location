import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
//import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as Device from 'expo-device';

import {Platform, StyleSheet, Text, View } from 'react-native';


export default function App() {

  //Variáveis para utilizar a geolocalização

  const [location, setLocation] = useState(null);
  const [errorMSG, setErrorMSG] = useState(null);

  //Verificar o sistema do aparelho

  useEffect(()=>{
    (async()=>{
      if(Platform.OS === 'android' && !Device.isDevice){
        setErrorMSG('Opa, esse app não rodará em um emulador de Android ou em Snack. Tente em seu aparelho móvel!');
        return;
      }

      //Verificar que a permisão de localização está ativada

      let {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMSG('Permissão para acessar a localização foi negada!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    })();
  }, []);

  let text = "Carregando...";

  if (errorMSG) {
    text = errorMSG;
  } else if(location) {
    text = JSON.stringify(location);
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{text}</Text>
      <StatusBar style="auto" />
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
  txt:{
    fontSize: 18,
    textAlign: 'center',
  }
});
