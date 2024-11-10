import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // Asegúrate de haber instalado esta librería

export default function PanicButtonScreen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [location, setLocation] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  // Función para obtener la ubicación actual
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        getLocation(latitude, longitude); // Llama a la función de geocodificación con las coordenadas obtenidas
      },
      (error) => {
        Alert.alert('Error', 'No se pudo obtener la ubicación.');
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Función para obtener la ubicación a partir de las coordenadas
  const getLocation = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBK2U9J64Zrx8CHJj7kDPOfh8AoE0XAeiY`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        setLocation(address);
      } else {
        Alert.alert('Error', 'No se pudo obtener la ubicación.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al obtener la ubicación.');
    }
  };

  const handlePanicButtonPress = () => {
    Alert.alert('¡Pánico activado!', 'Esto es una alerta de pánico.');
    getCurrentLocation(); // Obtener la ubicación cuando se presiona el botón de pánico
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {currentDateTime.toLocaleDateString()}
        </Text>
        <Text style={styles.timeText}>
          {currentDateTime.toLocaleTimeString()}
        </Text>
      </View>

      <TouchableOpacity style={styles.panicButton} onPress={handlePanicButtonPress}>
        <Text style={styles.panicButtonText}>¡Pánico!</Text>
      </TouchableOpacity>

      {/* Cuadro de ubicación debajo del botón de pánico */}
      <View style={styles.locationContainer}>
        {location ? (
          <Text style={styles.locationText}>Ubicación: {location}</Text>
        ) : (
          <Text style={styles.locationText}>Obteniendo ubicación...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 69, 58, 0.2)', // Fondo rojo suave y semi-transparente para estilo de alarma
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    position: 'absolute',
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 69, 58, 0.5)', // Borde rojo semi-transparente
    borderWidth: 2,
    shadowColor: '#FF453A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  dateText: {
    color: '#ffdddd', // Color claro para el texto de fecha
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  timeText: {
    color: '#ffffff', // Color blanco para el texto de la hora
    fontSize: 30,
    fontWeight: 'bold',
  },
  panicButton: {
    backgroundColor: '#ff4444', // Rojo intenso para el botón de pánico
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20,
  },
  panicButtonText: {
    color: '#fff', // Texto blanco
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#333333', // Fondo oscuro para el cuadro de ubicación
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '60%',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
