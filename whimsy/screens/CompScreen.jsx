//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import CompBookCard from '../components/compBookCard';
import { getAllStoriesFromCollection } from '../services/firebaseDb';


const CompScreen = ({navigation}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [stories, setStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);




  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllStories();
      return () => {
        // Cleanup when not viewing the screen
      };
    }, [])
  );

  const getAllStories = async () => {
    setRefreshing(true);
    const allStories = await getAllStoriesFromCollection();
    
    // Sort the stories based on votes in descending order
    const sortedStories = allStories.sort((a, b) => b.votes - a.votes);
    
    // Get the top 10 stories
    const topStories = sortedStories.slice(0, 10);
    
    setStories(topStories);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllStories();
  }, []);

  const navigate =  () => {
    console.log("click");
    navigation.navigate('Cover')
  };

  return (
    <ImageBackground
      source={require('../assets/bg/comp.png')}
      style={styles.backgroundImage}
    >

   <View>
      <TouchableOpacity onPress={navigate} style={styles.storybookContainer}>
          <Image 
            source={require('../assets/storyBook.png')}
            style={styles.storybookImg}
          />
        </TouchableOpacity>
   </View>


      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Competition</Text>
        <Text style={styles.body}>Our top stories of the month.</Text>

        <Text style={styles.subHeading}>Leader Board</Text>
      </>
      ) : null}

      <ScrollView style={styles.scrollViewContainer}>
        {stories.map((project, index) => (
          <CompBookCard key={index} data={project}  number={index + 1} />
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
    marginTop: 320,
  },
  scrollViewContainer:{
    height: 200,
    width: 500,
    position: 'absolute',
    marginTop: 550,
    marginLeft: 30,
  },
  storybookContainer:{
    position: 'absolute',
    marginTop: 210,
    marginLeft: -30
  }
  
})