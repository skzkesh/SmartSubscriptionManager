import React, { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import BASE_URL from '../config';

const AddSubscriberScreen = () => 
{
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [userId, setUserId] = React.useState("");

    // useEffect to retrieve userId from AsyncStorage when the component mounts
    useEffect(() => {
      const getUserId = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userId');
          if (storedUserId) {
            setUserId(storedUserId);
          } else {
            console.warn('User ID not found in AsyncStorage');
            // Handle the case where userId is not found (e.g., redirect to login)
          }
        } catch (error) {
          console.error('Error retrieving user ID:', error);
        }
      };

      getUserId();
    }, []);

    const addValidate = () => {
      if (name.trim() !== '' && email.trim() !== ''){
        return true;
      }
      return false;
    };

    const handleAdd = async () => {
      try {
        console.log("userId:", userId);
        console.log("Validation result:", addValidate(), name, email);

        if (addValidate()){
          const response = await axios.post(`${BASE_URL}/api/auth/subscriber`, {
          email,
          name,
          userId,
          });

          console.log(response.status);
          if (response.status == 201){
            Alert.alert('Success', 'Subscriber added!');

            setEmail('');
            setName('');
          }
        }
        else {
          Alert.alert('Error', 'All field are required');
        }       
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    };

     return (
     <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Name
        </Text>
        <TextInput
          style={styles.titleInput}
          placeholder="User name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.formTitle}>
          Email Address
        </Text>
        <TextInput
          style={styles.subjectInput}
          placeholder="User email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Pressable
          onPress={handleAdd}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Add</Text>
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
  formContainer: {
    
  },
  formTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 8,
     color: '#29353C',
  },
  titleInput: {
    height: 40,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#999',     
    borderRadius: 3,
    marginBottom: 10,
  },
  subjectInput: {
    height: 40,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#999',     
    borderRadius: 3,
    marginBottom: 10,
  },
  messageInput: {
    height: 250,
    padding: '3%',
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#999',     
    borderRadius: 3,
    marginBottom: 10,
  },
  addButton: {
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

export default AddSubscriberScreen;
