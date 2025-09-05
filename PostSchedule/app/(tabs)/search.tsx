import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '@/config';

type Subscription = {
  name: string,
  status: string,
};

const SearchScreen = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const renderCampaignItem = ({ item }: { item: Subscription }) => (
    <Pressable style={styles.subscriptionItem} onPress={() => handleItemPress(item.name)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.subscriptionTitle}>{item.name}</Text>
          <Text style={styles.subscriptionStatus}>{item.status}</Text>
        </View>
      </View>
    </Pressable>
  
    );
  
  const handleItemPress = async (name: string) => {
    await AsyncStorage.setItem('currItem', name);

    const currItem = await AsyncStorage.getItem('currItem');
    console.log('currItem from AsyncStorage:', currItem);
    
    router.push('../SubscriptionDetailScreen');
  };

  const handleFilterPress = async () => {
    router.replace('../FilterScreen');
  };
 
  const handleSearchPress = () => {
    console.log('button clicked');
    fetchSubscriptions();
  };

  const fetchSubscriptions = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      const response = await axios.post(`${BASE_URL}/api/subscription/find-subscription-keyword`, {
        userId,
        keyword,
      });

      setSubscriptions(response.data.subscription);

    }
    catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
            style={styles.keyword}
            placeholder="Search something.."
            placeholderTextColor={'#6A7E97'}
            value={keyword}
            onChangeText={setKeyword}
        />
        <Pressable
          onPress={handleSearchPress}
          style={( ) => [
            styles.searchButton,
            { backgroundColor: 'white' },
          ]}
        >
          <Text style={{ color: '#44576D', fontWeight: 'bold' }}>Find</Text>
        </Pressable>
        <Pressable
          onPress={handleFilterPress}
          style={( ) => [
            styles.filterButton,
            { backgroundColor: 'white' },
          ]}
        >
          <Text style={{ color: '#44576D', fontWeight: 'bold' }}>Filter</Text>
        </Pressable>
      </View>
      <View style={styles.subscriptionsContainer}>
        <Text style={styles.subscriptions}>
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
    backgroundColor: '#44576D',
  },
  subscriptions: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingLeft: 5,
  },
  searchContainer: {
    marginTop: 10,
    width: '95%', 
    flexDirection: 'row',
  },
  keyword: {
    flex: 1,
    width: 180,
    height: 45,
    padding: '3%',
    marginTop: 10,
    marginLeft: 15,
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#768A96',     
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  searchButton: {
    marginLeft: 5,
    marginTop: 10,
    height: 45,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    height: 45,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionItem: {
    height: 90,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  subscriptionTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  subscriptionStatus: {
    fontSize: 17,
  },
  subscriptionsContainer: {
    width: '95%',
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'flex-start', 
    marginTop: 0,
  },
});

export default SearchScreen;
