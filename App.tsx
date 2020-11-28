import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export default function App() {
  const [location, setLocations] = useState([{
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
  }])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
  
      if(status === 'granted') {
        await Location.startLocationUpdatesAsync('first', {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 0,
          foregroundService: {
            notificationTitle: 'First',
            notificationBody: `${location[0].coords.longitude}` ,
          },
          pausesUpdatesAutomatically: false
        })
      }
      
    })()
  }, [])

  TaskManager.defineTask('first', ({ data, error }) => {
    if(error) {
      console.log(error)
    }
  
    if(data ) {
      setLocations(data.locations)
    }
  })

  return (
    <View style={styles.container}>
      <Text>{location[0].coords.longitude}</Text>
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
});
