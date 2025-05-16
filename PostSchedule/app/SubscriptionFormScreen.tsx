import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../config'
import validation from '@/util/validation';
import date from '../util/date';


const SubscriptionFormScreen = () => 
{
    const router = useRouter();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [billingCycle, setBillingCycle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async () => {
      if (!name || !category || !amount || !billingCycle || !startDate) {
        Alert.alert('Error', 'All fields are required!');
      }
      if (!validation.validateDate(startDate)){
        Alert.alert('Invalid', 'Invalid date input!');
      }
      else {
        setName('');
        setCategory('');
        setAmount('');
        setBillingCycle('');
        setStartDate('');
        setNotes('');

        const success = await addSubscription();

        if (success){
          Alert.alert('Success', 'Your subscription is added');
          router.push('/(tabs)');
        }
      }
    };

    const addSubscription = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId);

        const normalizedBillingCycle = billingCycle.trim().toLowerCase();
        if (!validation.validateBillingCycle(normalizedBillingCycle)){
          return false;
        }

        const normalizedAmount = parseInt(amount);

        const response = await axios.post(`${BASE_URL}/api/subscription/add-subscription`, {
          userId,
          name, 
          category,
          normalizedAmount,
          normalizedBillingCycle,
          startDate,
          notes,
        });

        console.log("Subscription added:", response.data);
        if (response.status == 201) {
          return true;
        }
        else {
          return false;
        }
      } catch (error) {
        console.error("Error adding subscription item:", error);
      }
    };

     return (
     <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
       Subscription Form
       </Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'#B0BEC5'}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.formTitle}>
          Category
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor={'#B0BEC5'}
          value={category}
          onChangeText={setCategory}
        />
        <Text style={styles.formTitle}>
          Amount
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor={'#B0BEC5'}
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.formTitle}>
          Billing Cycle
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Weekly, Monthly, or Yearly"
          value={billingCycle}
          onChangeText={setBillingCycle}
        />
        <Text style={styles.formTitle}>
          Start Date
        </Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={startDate}
          onChangeText={setStartDate}
        />
        <Text style={styles.formTitle}>
          Notes
        </Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Notes"
          multiline
          numberOfLines={5}
          value={notes}
          onChangeText={setNotes}
        />
      </View>
      
      <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.createPostButton,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
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
  input: {
    height: 40,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#768A96',     
    borderRadius: 3,
    marginBottom: 10,
  },
  notesInput: {
    height: 150,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#768A96',     
    borderRadius: 3,
    marginBottom: 10,
  },
  createPostButton: {
    height: 50,
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

export default SubscriptionFormScreen;
