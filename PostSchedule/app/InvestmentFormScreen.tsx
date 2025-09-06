import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../config'
import validation from '@/util/validation';


const InvestmentFormScreen = () => 
{
    const router = useRouter();

    const addInvestmentForm = async () => {
      try {
      } catch (error) {
        console.error("Error adding investment item:", error);
      }
    };

     return (
     <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
       Investment Form
       </Text>
      <View style={styles.formContainer}>
      
      </View>
    </ScrollView>
     );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 60,
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
    fontWeight: 'bold',
    color: '#29353C',
  },
  formContainer: {
    
  },
  formTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     color: '#29353C',
     marginBottom: 8,
  },
});

export default InvestmentFormScreen;
