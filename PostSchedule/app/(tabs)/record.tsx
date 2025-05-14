import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View } from 'react-native';

import BASE_URL from '../../config';

type Subscription = {
    name: string,
    amount: number,
    totalExpense: number;
};

const RecordScreen = () => {
  const [totalSpend, setTotalSpend] = useState();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  
  useEffect(() => {
    const fetchSubscriptions = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId'); 
          console.log(userId);
          const response = await axios.post(`${BASE_URL}/api/subscription/get-subscription-all-spend`, {
            userId,
          });
          
            const fetchedSubscriptions = response.data.subscriptions;
            setSubscriptions(fetchedSubscriptions);

            const total = fetchedSubscriptions.reduce((sum: number, sub: Subscription) => {
                return sum + sub.totalExpense;
              }, 0);

            setTotalSpend(total);
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
        }
      };
    
      fetchSubscriptions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.totalSpendingTitle}>Total Spending: </Text>
        <Text style={styles.totalSpendingCapt}> ${totalSpend} </Text>
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
  contentContainer: {
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
  totalSpendingTitle: {
    paddingTop: 50,
    fontWeight: 'bold',
    color:  '#44576D',
    fontSize: 25,
  },
  totalSpendingCapt: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default RecordScreen;
