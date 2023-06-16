//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import CompBookCard from '../components/compBookCard';

const CompScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  let dummyData = [
    {title: 'The Lighthouse', author: 'Jess Thompson', prompt: "Magic Waterfall", genre: 'Action'},
    {title: 'Growing Pains', author: 'Cassidy Hue', prompt: "Magic Bean", genre: 'Fantasy'},
    {title: 'Lovesick', author: 'Alexa Pea', prompt: "Tinder", genre: 'Romance'},
    {title: 'Masks and Muggles', author: 'Emma Haas', prompt: "Wizardry", genre: 'Fantasy'},
    {title: 'The Magician', author: 'Joshy B', prompt: "Thee Sword", genre: 'Fantasy'},
  ]
  
  return (
    <ImageBackground
      source={require('../assets/bg/comp.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Competition</Text>
        <Text style={styles.body}>Our top stories of the month.</Text>

        <Text style={styles.subHeading}>Leader Board</Text>
      </>
      ) : null}

      <ScrollView style={styles.scrollView}>
        {dummyData.map((project, index) => (
          <CompBookCard key={index} data={project}/>
        ))}
      </ScrollView>

    </ImageBackground>
  )
}


export default CompScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30
  },
  heading: {
    fontFamily: 'Hensa', 
    fontSize: 52,
    color: 'white',
    width: 350,
    paddingTop: 65,
    paddingLeft: 20,
    lineHeight: 50
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft:20,
    paddingTop: 5,
    paddingBottom: 40,
    // fontFamily: 'Open Sans'
  },
  subHeading:{
    color: 'white',
    fontWeight: 600,
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 320,

  },
  
})