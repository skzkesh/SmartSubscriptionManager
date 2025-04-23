import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const CreateCampaignScreen = () => 
{
    const [selected, setSelected] = React.useState("");
    const data = [
        {key: '1', value: 'Email'},
        {key: '1', value: 'SMS'},
    ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Campaign
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
            Campaign Title
        </Text>
        <TextInput>
            placeholder='Title'
        </TextInput>
        <Text style={styles.formTitle}>
            Campaign Type
        </Text>
        {/* <SelectList
            data = {data}
            setSelected = {selected}
            placeholder = 'Select Type'
        /> */}
        <Text style={styles.formTitle}>
            Message Content
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          //onPress={onIncrement}
          style={({ pressed }) => [
            styles.createPostButton,
            {
              backgroundColor: pressed
                ? '#505050'
                : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Preview Campaign</Text>
        </Pressable>
      </View>
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
