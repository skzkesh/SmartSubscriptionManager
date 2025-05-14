import React, { useState } from 'react';

import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type User = {
  email: string;
};

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogOutPress = () => {
    router.push('/LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleLogOutPress}
          style={({ pressed }) => [
            styles.logOutButton,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: '#FE0E0E0'
  },
  buttonContainer: {
    width: '95%', 
    paddingHorizontal: 16, 
  },
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    paddingTop: 80,
    fontWeight: 'bold',
    color:  '#44576D',
  },
  logOutButton: {
    width: '100%',
    height: '25%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
