import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
//import ReactDOM from 'react-native-dom';
//import { TextInput } from 'react-native-gesture-handler';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const CreateCampaignScreen = () => 
{
    const router = useRouter();
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = () => {
      if (!title || !subject || !message) {
        Alert.alert('Error', 'All fields are required!');
      }
      else {
        Alert.alert('Success', `Your form is submitted.`);
        setTitle('');
        setSubject('');
        setMessage('');
        router.replace('/(tabs)/EmailPreviewScreen');
      }
    };

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
              backgroundColor: pressed ? '#505050' : 'rgba(39, 39, 39, 1)',
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
