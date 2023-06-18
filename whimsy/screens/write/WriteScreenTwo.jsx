import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { globalStyles } from '../../utils/GlobalStyles';

const WriteScreenTwo = ({ navigation, route }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [isPromptClicked, setIsPromptClicked] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  // const generateRandomPrompt = () => {
  //   const prompts = [
  //     'mysterious island.',
  //     'detective',
  //     'a magical pen.'
  //   ];
  //   const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  //   setStoryPrompt(randomPrompt);
  //   setIsPromptClicked(true);
  // };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const continueToNextScreen = () => {
    navigation.navigate('WriteThree', { genre: route.params.genre, prompt: storyPrompt });
  };


  const generateRandomPrompt = () => {
    const prompts = [
      'Forgotten treasure',
      'Whispering voices',
      'Unexpected reunion',
      'Wishing stone',
      'Parallel dimension',
      'Secret society',
      'Last survivor',
      'Haunted twist',
      'Time traveler',
      'Missing artifact',
      'Talking animal',
      'Cursed object',
      'Long-lost relative',
      'Hidden doorway',
      'Hidden talent',
      'Strange phenomenon',
      'Mythical legend',
      'Mysterious letter',
      'Future seer',
      'Dark secrets',
      'Mistaken identity',
      'Healing melodies',
      'Scientific experiment',
      'Youth fountain',
      'Prophecy fulfilled',
      'Remote cabin',
      'Memory eraser',
      'Parallel universes',
      'Forbidden love',
      'Painted message'
    ];
    
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setStoryPrompt(randomPrompt);
    setIsPromptClicked(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/bg/general.png')}
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/backBtn.png')} style={styles.backBtn}/>
      </TouchableOpacity>

      {fontLoaded && (
        <View style={styles.bodyContainer}>
          <Text style={styles.heading}>Prompt</Text>
          <Text style={styles.body}>Let’s see what your mystery prompt is.</Text>

          {isPromptClicked ? (
            <Text style={styles.promptText}>{storyPrompt}</Text>
          ) : (
            <TouchableOpacity style={styles.chest} onPress={generateRandomPrompt}>
              <Image source={require('../../assets/chest.png')} style={styles.chestImg}/>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={continueToNextScreen} disabled={!isPromptClicked}>
            <ImageBackground source={require('../../assets/btn/bg.png')} style={globalStyles.btnBackground}>
              <Text style={globalStyles.btnText}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default WriteScreenTwo;

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    display: 'flex'
  },
  bodyContainer:{
    marginTop: 280,
    flex: 1
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 52,
    color: 'white',
    width: 350,
    paddingTop: 60,
    paddingLeft: 20,
    lineHeight: 50,
    marginBottom: -10,
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  scrollView: {
    height: 100,
  },
  subHeading:{
    color: 'white',
    fontWeight: 600,
    fontSize: 18,
    paddingLeft: 20,
  },
  button: {
    width: 357,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 460,
    marginBottom: -25,
    position: 'absolute'
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 40,
    zIndex: 1,
  },
  backBtn:{
    width: 50,
    height: 50
  },
  promptText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
  },
  chest: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chestImg: {
    width: 250,
    height: 200,
  }
});
