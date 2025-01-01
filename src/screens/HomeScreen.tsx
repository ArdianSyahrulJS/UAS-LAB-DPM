import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Book Tracking App!</Text>
      <Text style={styles.subtitle}>Manage your books and track your reading progress effortlessly.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5ebe0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7a5c58',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#bfa49a',
    marginTop: 10,
    lineHeight: 24,
  },
});

export default HomeScreen;
