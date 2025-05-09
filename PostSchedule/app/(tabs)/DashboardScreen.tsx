import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../../config'


type Campaign = {
    title: string,
    campaignType: string,
};

const Dashboard = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState();

  const handleStartPress = () => {
    router.push('/CreateCampaignScreen');
  };

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
      <Pressable
        style={styles.campaignItem}
      >
        <Text style={styles.campaignTitle}>{item.title}</Text>
        <Text style={styles.campaignType}>{item.campaignType}</Text>
      </Pressable>
    );
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/campaign/getAllCampaign`)
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Marketing Campaign Planner
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
          <Text style={styles.buttonText}>Create New Campaign</Text>
        </Pressable>
      </View>
      <View style={styles.savedCampaignContainer}>
        <Text style={styles.savedCampaign}>
            Saved Campaigns
        </Text>
        <View style={{ width: '100%', flex: 1}}>
            <FlatList
                data={campaigns}
                keyExtractor={(item) => item.title}
                renderItem={renderCampaignItem}
            />
        </View>
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
    marginTop: 100,
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
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
