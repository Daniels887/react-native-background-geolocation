import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { Marker, Polyline } from 'react-native-maps'

export default function App() {
  const [location, setLocations] = useState([{
      latitude: 0,
      longitude: 0,
  }])

  useEffect(() => {
    console.log(location)
  }, [location])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
  
      if(status === 'granted') {
        await Location.startLocationUpdatesAsync('first', {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 0,
          foregroundService: {
            notificationTitle: 'First',
            notificationBody: 'Você está sendo monitorado' ,
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
      const currentLocation = {
        latitude: data.locations[0].coords.latitude,
        longitude: data.locations[0].coords.longitude
      }
      setLocations([...location, currentLocation ])
    }
  })

  return (
      <MapView 
      style={styles.map}
      initialRegion={{
      latitude: -14.2374362,
      longitude: -60.3452921,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }}>
        <Polyline coordinates={[
			{ latitude: -23.4390556, longitude: -46.5184384 },
		]} />
    </MapView>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27
  },

});
