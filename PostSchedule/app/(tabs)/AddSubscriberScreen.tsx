import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const AddSubscriberScreen = () => 
{
    const router = useRouter();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleAdd = () => {
      if (!name || !email) {
        Alert.alert('Error', 'All fields are required!');
      }
      else {
        Alert.alert('Success', `Your form is submitted.`);
        setName('');
        setEmail('');
      }
    };

     return (
     <View style={styles.container}>
      <Text style={styles.title}>
            Add Subscriber
       </Text>
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
              backgroundColor: pressed ? '#505050' : 'rgba(39, 39, 39, 1)',
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
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    paddingTop: 80,
  },
  formContainer: {
    
  },
  formTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 8,
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
