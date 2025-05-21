import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, SafeAreaView, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../../config'


type Subscription = {
    name: string,
    status: string,
};

const Dashboard = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleStartPress = () => {
    router.push('../SubscriptionFormScreen');
  };

  const handleItemPress = async (name: string) => {
    await AsyncStorage.setItem('currItem', name);

    const currItem = await AsyncStorage.getItem('currItem');
    console.log('currItem from AsyncStorage:', currItem);
    
    router.push('../SubscriptionDetailScreen');
  };

  const renderCampaignItem = ({ item }: { item: Subscription }) => (
    <Pressable style={styles.campaignItem} onPress={() => handleItemPress(item.name)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.campaignTitle}>{item.name}</Text>
          <Text style={styles.campaignType}>{item.status}</Text>
        </View>
      </View>
    </Pressable>
  
    );
  
    useEffect(() => {
      const fetchSubscriptions = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId'); 
          console.log(userId);
          const response = await axios.post(`${BASE_URL}/api/subscription/get-subscription-all`, {
            userId,
          });
          console.log("Fetched subscriptions:", response.data.subscriptions);
          setSubscriptions(response.data.subscriptions);
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
        }
      };
    
      fetchSubscriptions();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Smart Subscription Manager
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleStartPress}
          style={({ pressed }) => [
            styles.createPostButton,
            {
              backgroundColor: pressed
                ? '#29353C'
                : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Add New Subscription</Text>
        </Pressable>
      </View>
      {/* <View style={styles.notificationContainer}>
        <Text>Next renewal: </Text>
      </View> */}
      <View style={styles.savedCampaignContainer}>
        <Text style={styles.savedCampaign}>
            My Subscriptions
        </Text>
        <View style={{ width: '100%', flex: 1}}>
            <FlatList
                data={subscriptions}
                keyExtractor={(item) => item.name}
                renderItem={renderCampaignItem}
            />
        </View>
      </View>
    </SafeAreaView>
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
    marginTop: 30,
    fontWeight: 'bold',
    color: '#29353C',
  },
  createPostButton: {
    width: '100%',
    height: 85,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationContainer: {
    width: '95%',  
    paddingHorizontal: 16,
  },
  savedCampaignContainer: {
    width: '95%',
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'flex-start', 
    marginTop: 0,
  },
  savedCampaign: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingLeft: 5,
    color: '#29353C',
  },
  campaignItem: {
    height: 90,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  campaignTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  campaignType: {
    fontSize: 17,
  },
});

export default Dashboard;