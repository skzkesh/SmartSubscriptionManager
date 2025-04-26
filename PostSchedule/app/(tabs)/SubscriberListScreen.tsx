import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';


type User = {
    email: string,
};

const users: User[] = [
    { email: 'user@email.com' },
    { email: 'friend@email.com' },
  ];

const SubscriberList = () => {
  const router = useRouter();

    const handleAddPress = () => {
        router.push('/AddSubscriberScreen');
    };

    const renderCampaignItem = ({ item }: { item: User }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.campaignTitle}>{item.email}</Text>
          <Image
            source={require('../../assets/images/minus-symbol-256x256.png')}
            style={styles.emailPreviewProfile}
          />
        </View>
      );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Subscriber List
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleAddPress}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: pressed
                ? '#505050'
                : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Add Subscriber</Text>
        </Pressable>
      </View>
      <View style={styles.savedCampaignContainer}>
        <View style={{ width: '100%', flex: 1}}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.email}
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
