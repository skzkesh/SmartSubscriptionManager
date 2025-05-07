import React from 'react';

import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';


const FeatureOptions = () =>  {
    const router = useRouter();
    
    const emailCampaign = () => {
        router.replace('/(tabs)/DashboardScreen');
    };

    const customizableLink = () => {
        router.replace('/LinkDashboardScreen');
    };

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={emailCampaign}
          style={({ pressed }) => [
            styles.optionButton,
            {
              backgroundColor: pressed
                ? '#505050'
                : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Email Campaign</Text>
        </Pressable>
        <Pressable
          onPress={customizableLink}
          style={({ pressed }) => [
            styles.optionButton,
            {
              backgroundColor: pressed
                ? '#505050'
                : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Link Website Designer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    width: '95%', 
    paddingHorizontal: 16, 
  },
  optionButton: {
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
});

export default FeatureOptions;