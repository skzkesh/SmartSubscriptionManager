import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
//import ReactDOM from 'react-native-dom';
//import { TextInput } from 'react-native-gesture-handler';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const CreateCampaignScreen = () => 
{
    const [selected, setSelected] = React.useState("");
    const [name, setName] = React.useState("");
    

     return (
     <View style={styles.container}>
      <Text style={styles.title}>
       Create Campaign
       </Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Campaign Title
        </Text>
        {/* <TextInput>
          placeholder='Title'
        </TextInput> */}
      </View>
      <form>
        <label>Name
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label>
      </form>
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

  },
  createPostButton: {
    width: '100%',
    height: '30%',
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
