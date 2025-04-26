import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import validateEmail from '../util/validation';
import { SafeAreaView } from 'react-native';



const LoginScreen = () =>  {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLoginButon = () => {
        if (!email || !password){
          Alert.alert('Empty Field', 'All field must be filled');
        }
        else if (!validateEmail(email)){
          Alert.alert('Invalid Email', 'Email format is invalid');
        }
        else {
          setEmail("");
          setPassword("");
          router.replace('/(tabs)/DashboardScreen');
        }
      };

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
              backgroundColor: pressed ? '#505050' : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
      <Text style={{marginTop: 10}}>
        Do not have an account? {' '}
        <Text
          onPress={() => router.replace('/')}
          style={{ color: 'blue', textDecorationLine: 'underline' }}
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
    marginTop: 150,
    marginBottom: 45,
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 45,
    padding: '3%',
    margin: 5,
    fontSize: 17,
    borderWidth: 1,           
    borderColor: '#999',     
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
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