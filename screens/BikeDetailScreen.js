import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BikeDetail({ route }) {
  const { bikeId } = route.params;
  const [bike, setBike] = useState(null);

  useEffect(() => {
    axios.get(`https://6731c7cb7aaf2a9aff120780.mockapi.io/bikes/${bikeId}`)
      .then(response => setBike(response.data))
      .catch(error => console.error(error));
  }, [bikeId]);

  if (!bike) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: bike.image }} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{bike.name}</Text>
      <Text style={styles.bikePrice}>${bike.price}</Text>
      <Text style={styles.description}>{bike.description || 'No description available'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  bikeImage: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
  bikeName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  bikePrice: { fontSize: 20, color: 'green', marginBottom: 10 },
  description: { fontSize: 16 },
});
