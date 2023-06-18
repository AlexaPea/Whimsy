import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font';
import { getCurrentFeaturedStories } from '../../services/firebaseDb';

const Contents = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [featuredStories, setFeaturedStories] = useState([]);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    fetchFeaturedStories();
  }, []);

  const fetchFeaturedStories = async () => {
    try {
      const stories = await getCurrentFeaturedStories();
      setFeaturedStories(stories);
    } catch (error) {
      console.log('Error fetching featured stories:', error);
    }
  };

  const handleStoryPress = (story) => {
    navigation.navigate('ReadStory', { story });
  };
  

  return (
    <ImageBackground
      source={require('../../assets/bg/page.png')}
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
      </TouchableOpacity>

      {fontLoaded ? (
        <>
          <View style={styles.container}>
            <Text style={styles.heading}>Contents</Text>
            <Text style={styles.body}>Embrace the charm of monthly genre gems, handpicked to offer you the absolute best.</Text>
          </View>

          {featuredStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.containerBody}
              onPress={() => handleStoryPress(story)}
            >
              <Text style={styles.subheading}>{story.genre}</Text>
              <Text style={styles.title}>{story.title} - {story.creator} </Text>
            </TouchableOpacity>
          ))}
        </>
      ) : null}
    </ImageBackground>
  );
};

export default Contents;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    marginTop: 100,
  },
  containerBody: {
    textAlign: 'left',
    marginTop: 10,
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 48,
    color: 'white',
    width: 350,
    lineHeight: 50,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  body: {
    color: 'white',
    width: 290,
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'center',
  },
  title:{
    color: 'white',
    width: 290,
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'left',
    marginLeft: 60
  },
  logoutButton: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 340,
  },
  logoutIcon: {
    height: 40,
    width: 40,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 40,
    zIndex: 1,
  },
  backBtn: {
    width: 50,
    height: 50,
  },
});
