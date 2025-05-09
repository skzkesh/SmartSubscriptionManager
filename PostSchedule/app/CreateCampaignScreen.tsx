import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../config'


const CreateCampaignScreen = () => 
{
    const router = useRouter();
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async () => {
      if (!title || !subject || !message) {
        Alert.alert('Error', 'All fields are required!');
      }
      else {
        setTitle('');
        setSubject('');
        setMessage('');

        const success = await saveCampaign();

        if (success){
          Alert.alert('Success', 'Your campaign is saved');
          router.push('/EmailPreviewScreen');
        }
      }
    };

    const saveCampaign = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.post(`${BASE_URL}/api/campaign/saveCampaign`, {
          title,
          subject,
          message,
          userId,
        });
        
        console.log('Status:', response.status);
        
        if (response.status == 201) {
          await AsyncStorage.setItem('campaignSubject', subject);
          await AsyncStorage.setItem('campaignMessage', message);
          return true;
        }
        else {
          return false;
        }
      }
      catch (error) {
        console.error(error);
        Alert.alert('Failed', 'Fail to save campaign');
      }
    }
     return (
     <View style={styles.container}>
      <Text style={styles.title}>
       Create Campaign
       </Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Title
        </Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Write your title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.formTitle}>
          Subject
        </Text>
        <TextInput
          style={styles.subjectInput}
          placeholder="Write your subject"
          value={subject}
          onChangeText={setSubject}
        />
        <Text style={styles.formTitle}>
          Message
        </Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Write your description"
          multiline
          numberOfLines={10}
          value={message}
          onChangeText={setMessage}
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
    </View>
     );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
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
  titleInput: {
    height: 40,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#768A96',     
    borderRadius: 3,
    marginBottom: 10,
  },
  subjectInput: {
    height: 40,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,     
    borderColor: '#768A96',      
    borderRadius: 3,
    marginBottom: 10,
  },
  messageInput: {
    height: 250,
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

export default CreateCampaignScreen;
