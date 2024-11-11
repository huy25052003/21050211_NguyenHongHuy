import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <Image source={{uri:"https://api.xedap.vn/wp-content/uploads/2023/09/Flash1_Blue.jpg"}} style={{width:100, height:100}}/>
      <Text style={styles.title}>POWER BIKE SHOP</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Bikes')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
