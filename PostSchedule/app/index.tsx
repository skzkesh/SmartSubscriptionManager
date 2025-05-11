import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';

import validation from '../util/validation';
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
        else if (!validation.validateEmail(email)){
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
        const response = await axios.post(`${BASE_URL}/api/auth/sign-up`, {
          email,
          name,
          password,
        });
        
        console.log('Status:', response.status);
        
        if (response.status == 201) {
          const userId = response.data.userId; 
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
        placeholderTextColor={'#6A7E97'}
        value={name}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={'#6A7E97'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#6A7E97'}
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
              backgroundColor : 'white',
            },
          ]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
      <Text style={{marginTop: 10, color: 'white'}}>
        Already have account? {' '}
        <Text
          onPress={() => router.replace('../LoginScreen')}
          style={{ color: 'white', textDecorationLine: 'underline', fontWeight:'bold' }}
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
    backgroundColor: '#44576D',
  },
  greeting: {
    marginTop: 170,
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color:  'white',
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
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    fontSize: 16,
    color: '#44576D',
  },
});

export default SignUpScreen;