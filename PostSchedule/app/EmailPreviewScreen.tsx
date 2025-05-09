import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../config';

const EmailPreview = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");

  useEffect(() => {
    const getName = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        console.log('Stored email:', email); 
        const response = await axios.post(`${BASE_URL}/api/auth/getName`, {
          email,
        });

        if (response.data?.name) {
          setName(response.data.name);
        }
      } catch (e) {
        console.error('Failed to load user name:', e);
      }
    };

    const getCampaignSubject = async () => {
      try {
        const subject = await AsyncStorage.getItem('campaignSubject');
        if (subject !== null) {
          setCampaignSubject(subject);
        }
      } catch (e) {
        console.error('Failed to load campaign subject:', e);
      }
    };

    const getCampaignMessage = async () => {
      try {
        const message = await AsyncStorage.getItem('campaignMessage');
        if (message !== null) {
          setCampaignMessage(message);
        }
      } catch (e) {
        console.error('Failed to load campaign message:', e);
      }
    };
  
    getName();
    getCampaignSubject();
    getCampaignMessage();
  }, []);

  const handleConfirmPress = () => {
    router.push('/ConfirmationScreen');
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.title}>
                Preview
            </Text>
            <View style={styles.previewContainer}>
                    <Text style={styles.emailPreviewSubject}>
                        {campaignSubject}
                    </Text>
                    <View style={styles.row}>
                        <Image
                            source={require('../assets/images/blank-profile-picture-973460_960_720.webp')} // make sure the path is correct
                            style={styles.emailPreviewProfile}
                        />
                        <View style={styles.rowSender}>
                            <Text style={styles.emailPreviewSender}>
                                Marketing Scheduler
                            </Text>
                            <Text style={styles.emailPreviewToMe}>
                                to me 
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.emailPreviewMessage}>
                      {campaignMessage}
                    </Text>
            </View>
            <Pressable
                onPress={handleConfirmPress}
                style={({ pressed }) => [
                    styles.confirmButton,
                    {
                    backgroundColor: pressed
                        ? '#505050'
                        : 'rgba(39, 39, 39, 1)',
                    },
                ]}>
                <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#FE0E0E0'
  },
  innerContainer: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    paddingTop: 80,
  },
  previewContainer: {
    width: '95%',
    paddingTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,           
    borderColor: '#999',  
  },
  emailPreviewSubject: {
    fontSize: 22,
    fontFamily: 'System',
    color: '#202124',
    marginBottom: 10,
  },
  emailPreviewMessage: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System', 
    color: '#333',
  },
  emailPreviewProfile: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  emailPreviewSender: {
    fontSize: 12,
  },
  emailPreviewToMe: {
    fontSize: 10,
    marginTop: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  rowSender: {
    marginLeft: 15,
  },
  confirmButton: {
    width: 120,
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

export default EmailPreview;
