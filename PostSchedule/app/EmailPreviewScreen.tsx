import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';


const EmailPreview = () => {
  const router = useRouter();

  const handleConfirmPress = () => {
    router.push('/ConfirmationScreen');
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.title}>
                Preview
            </Text>
            <View style={styles.previewContainer}>
                    <Text style={styles.emailPreviewSubject}>
                        This is example emails
                    </Text>
                    <View style={styles.row}>
                        <Image
                            source={require('../assets/images/blank-profile-picture-973460_960_720.webp')} // make sure the path is correct
                            style={styles.emailPreviewProfile}
                        />
                        <View style={styles.rowSender}>
                            <Text style={styles.emailPreviewSender}>
                                Marketing Scheduler
                            </Text>
                            <Text style={styles.emailPreviewToMe}>
                                to me 
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.emailPreviewMessage}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
            </View>
            <Pressable
                onPress={handleConfirmPress}
                style={({ pressed }) => [
                    styles.confirmButton,
                    {
                    backgroundColor: pressed
                        ? '#505050'
                        : 'rgba(39, 39, 39, 1)',
                    },
                ]}>
                <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#FE0E0E0'
  },
  innerContainer: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    paddingTop: 80,
  },
  previewContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,           
    borderColor: '#999',  
  },
  emailPreviewSubject: {
    fontSize: 22,
    fontFamily: 'System',
    color: '#202124',
    marginBottom: 10,
  },
  emailPreviewMessage: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System', 
    color: '#333',
  },
  emailPreviewProfile: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  emailPreviewSender: {
    fontSize: 12,
  },
  emailPreviewToMe: {
    fontSize: 10,
    marginTop: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  rowSender: {
    marginLeft: 15,
  },
  confirmButton: {
    width: '35%',
    height: '10%',
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

export default EmailPreview;
