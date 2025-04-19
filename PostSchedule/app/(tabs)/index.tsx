import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const StartScreen: React.FC<Props> = () => 
{
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Welcome 
      </Text>
      <View>
        <Pressable
          //onPress={onIncrement}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? '#505050'
                : 'rgba(39, 39, 39, 1)',
            },
          ]}>
          <Text style={styles.buttonText}>Click Here to Start</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  button: {
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

export default StartScreen;
