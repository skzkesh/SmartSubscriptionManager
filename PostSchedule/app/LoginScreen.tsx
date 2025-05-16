import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';

import validation from '../util/validation';
import BASE_URL from '../config';


const LoginScreen = () =>  {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginButon = async () => {
        if (!email || !password){
          Alert.alert('Empty Field', 'All field must be filled');
        }

        else if (!validation.validateEmail(email)){
          Alert.alert('Invalid Email', 'Email format is invalid');
        }

        else {
          setEmail("");
          setPassword("");
          
          const success = await validateLogin();
          console.log(success);

          if (success){
            Alert.alert('Success', 'User login successfully');
            router.replace('/(tabs)');
          }
        }
      };

    const validateLogin = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/log-in`, {
          email,
          password,
        });

        if (response.status == 200) {
          await AsyncStorage.setItem('userId', response.data.userId); 
          await AsyncStorage.setItem('email', email);

          console.log("UserID of current user " + response.data.userId);
          console.log("Email of current user: " + email);

          return true;
        }
        
        else {
          return false;
        }

      }
      catch(error){
        console.error(error);
        Alert.alert('Error', 'Failed to log in');
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View>
        <Pressable
          onPress={handleLoginButon}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
      <Text style={{marginTop: 10, color: '#44576D'}}>
        Do not have an account? {' '}
        <Text
          onPress={() => router.replace('/')}
          style={{ color: '#44576D', textDecorationLine: 'underline', fontWeight:'bold' }}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    marginTop: 170,
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color:  '#44576D',
  },
  input: {
    width: 300,
    height: 45,
    padding: '3%',
    margin: 5,
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#768A96',     
    borderRadius: 8,
    marginBottom: 10,
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

export default LoginScreen;