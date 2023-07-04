import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const TouchableWithSound = ({ onPress, children, ...props }) => {
  const playClickSound = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/click.mp3'));
      await soundObject.playAsync();
      console.log(play);
    } catch (error) {
      console.log('Failed to play the click sound effect', error);
    }
  };

  const handlePress = () => {
    playClickSound(); // Play the click sound effect
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableWithSound;
