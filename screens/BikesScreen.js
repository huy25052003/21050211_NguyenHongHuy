import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BikesScreen({ navigation }) {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    axios.get('https://6731c7cb7aaf2a9aff120780.mockapi.io/bikes')
      .then(response => {
        setBikes(response.data);
        setFilteredBikes(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const filterBikes = (type) => {
    setActiveFilter(type);
    if (type === 'All') {
      setFilteredBikes(bikes);
    } else {
      setFilteredBikes(bikes.filter(bike => bike.type === type));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The World's Best Bike</Text>
      
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Roadbike', 'Mountain'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, activeFilter === type && styles.activeFilterButton]}
            onPress={() => filterBikes(type)}
          >
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Bike Grid */}
      <FlatList
        data={filteredBikes}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bikeCard} onPress={() => navigation.navigate('BikeDetail', { bikeId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.bikeImage} />
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text style={styles.bikePrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilterButton: { backgroundColor: '#f8b400' },
  filterText: { color: '#333' },
  bikeCard: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  bikeImage: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 5 },
  bikeName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  bikePrice: { fontSize: 14, color: 'green' },
  listContent: { paddingBottom: 20 }, // Adds padding to the bottom of the list for better scrolling experience
});
