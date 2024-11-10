import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';

export default function PanicButtonScreen() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  const handlePanicButtonPress = () => {
    Alert.alert('¡Pánico activado!', 'Esto es una alerta de pánico.');
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
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
});
