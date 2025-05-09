import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../../config';

type User = {
  email: string;
};

const SubscriberList = () => {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<User[]>([]);

  const handleAddPress = () => {
    router.push('/AddSubscriberScreen');
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/users/getAllSubscriber`)
      .then((response) => setSubscribers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const renderCampaignItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.campaignTitle}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscriber List</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleAddPress}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}
        >
          <Text style={styles.buttonText}>Add Subscriber</Text>
        </Pressable>
      </View>

      <View style={styles.subscriberListContainer}>
        <FlatList
          data={subscribers}
          keyExtractor={(item) => item.email}
          renderItem={renderCampaignItem}
          ListEmptyComponent={<Text>No subscribers found.</Text>}
        />
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
  itemContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',   
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
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
  addButton: {
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
  subscriberListContainer: {
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
  emailPreviewProfile: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default SubscriberList;
