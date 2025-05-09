import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';

import validateEmail from '../util/validation';
import BASE_URL from '../config';


// Handle sign up logic
const SignUpScreen = () =>  {
    const router = useRouter();
    const [name, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSignUpButon = async () => {
        if (!name || !email || !password){
          Alert.alert('Empty Field', 'All field must be filled');
        }
        else if (!validateEmail(email)){
          Alert.alert('Invalid Email', 'Email format is invalid');
        }
        else {
          const success = await saveCredential();
          console.log(success);

          if (success) {
            setUsername("")
            setEmail("");
            setPassword("");
            Alert.alert('Success', 'User successfully signed up');
            router.replace('/(tabs)');
          }
        }
    };

    const saveCredential = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
          name,
          email,
          password,
        });
        
        console.log('Status:', response.status);
        
        if (response.status == 201) {
          const userId = response.data.userId; 
          console.log(userId);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('email', email);
          return true;
        }
        else {
          return false;
        }
      }
      catch (error) {
        console.error(error);
        Alert.alert('Failed', 'Fail to save credential');
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setUsername}
      />
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
          onPress={handleSignUpButon}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#29353C' : '#44576D',
            },
          ]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
      <Text style={{marginTop: 10, color: '#29353C'}}>
        Already have account? {' '}
        <Text
          onPress={() => router.replace('../LoginScreen')}
          style={{ color: 'blue', textDecorationLine: 'underline' }}
        >
          Log In
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

export default SignUpScreen;