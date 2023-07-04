import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import BackgroundMusic from '../assets/backgroundMusic.mp3';

export default function BackgroundMusicPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Load the background music
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(BackgroundMusic, { isLooping: true });
        setSound(sound);
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };

    loadSound();

    // Clean up resources when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    // Play or pause the background music based on the isPlaying state
    const toggleMusic = async () => {
      if (sound) {
        if (isPlaying) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
        }
      }
    };

    toggleMusic();
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <TouchableOpacity style={styles.musicPlayer} onPress={togglePlayPause}>
      <Ionicons name={isPlaying ? 'volume-high-outline' : 'volume-mute-outline'} size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = {
  musicPlayer: {
    position: 'absolute',
    top: 170,
    left: 50,
    width: 60,
    height: 60,
    borderRadius: 55,
    backgroundColor: 'rgba(68, 29, 12, 0.69)',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
};
