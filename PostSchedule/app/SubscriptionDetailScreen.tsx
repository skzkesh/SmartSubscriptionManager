import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import BASE_URL from '../config';

const SubscriptionDetailsScreen = () => {
    const router = useRouter();
  const [name, setName] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [nextBillingDate, setNextBillingDate] = useState<string | undefined>();

  // Fetch subscription details when the component mounts
  useEffect(() => {
    displayInfo();
  }, []);

  const displayInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const currItem = await AsyncStorage.getItem('currItem');
      
      if (!userId || !currItem) {
        console.error('No userId or currItem found in AsyncStorage');
        return;
      }

      console.log(userId);
      console.log(name);

      setName(currItem);

    //   const response = await axios.post(`${BASE_URL}/api/subscription/get-subscription-information`, {
    //     userId,
    //     name,
    //   });

    //   const userSubscription = response.data.subscription;
    //   setName(userSubscription.name);
    //   setPrice(userSubscription.amount);
    //   setNextBillingDate(userSubscription.nextBillingDate);
    } catch (error) {
      console.error('Error fetching subscription details:', error);
    }
  };

  const handleDeleteButton = async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        const currItem = await AsyncStorage.getItem('currItem');
        const response = await axios.post(`${BASE_URL}/api/delete-subscription`, {
          email,
          name: currItem,
        });
        router.replace('/(tabs)');
      }
      catch(error){
        console.error(error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Detail</Text>
      <Text style={styles.detail}>Name: {name}</Text>
      {/* <Text style={styles.detail}>Price: {price}</Text>
      <Text style={styles.detail}>Next Billing Date: {nextBillingDate}</Text> */}
      {/* Add any other fields you want to display from MongoDB */}
      <View>
        <Pressable
          onPress={handleDeleteButton}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SubscriptionDetailsScreen;
