import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';

const ConfirmationScreen = () => {
  const router = useRouter();
  const [recipient, setRecipient] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleRecipientChange = (value: string) => setRecipient(value);
  const handleStatusChange = (value: string) => setStatus(value);
  const handleFinishPress = () => router.replace('/(tabs)/DashboardScreen');

  const recipientOption = [
    { label: 'All', value: 'all' },
    { label: 'Custom', value: 'custom' },
  ];

  const statusOption = [
    { label: 'Draft', value: 'draft' },
    { label: 'Post Now', value: 'post' },
    { label: 'Scheduled', value: 'scheduled' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Confirm</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Choose Recipient</Text>
          <RNPickerSelect
            onValueChange={handleRecipientChange}
            items={recipientOption}
            value={recipient}
            placeholder={{ label: 'Select an option...', value: undefined }}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: pickerSelectStyles.inputIOS,
              inputAndroid: pickerSelectStyles.inputAndroid,
              iconContainer: {
                top: 15,
                right: 12,
                zIndex: 9999,  // Ensure the dropdown icon is on top
              },
            }}
            Icon={() => {
              return <Ionicons name="chevron-down" size={24} color="gray" />;
            }}
          />

          <Text style={styles.formTitle}>Status</Text>
          <RNPickerSelect
            onValueChange={handleStatusChange}
            items={statusOption}
            placeholder={{ label: 'Select an option...', value: undefined }}
            value={status}
            style={{
              inputIOS: pickerSelectStyles.inputIOS,
              inputAndroid: pickerSelectStyles.inputAndroid,
              viewContainer: pickerSelectStyles.viewContainer,
            }}
          />
        </View>

        <Pressable
          onPress={handleFinishPress}
          style={({ pressed }) => [
            styles.finishButton,
            {
              backgroundColor: pressed ? '#505050' : 'rgba(39, 39, 39, 1)',
            },
          ]}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FE0E0E0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  finishButton: {
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  viewContainer: {
    marginVertical: 10,
    width: '100%',
  },
});

export default ConfirmationScreen;
