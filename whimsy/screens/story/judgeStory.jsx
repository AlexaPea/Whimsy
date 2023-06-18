import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';

const Contents = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const featuredStories = [
    { genre: 'Classic Twist', description: 'List Twist', id: '1' },
    { genre: 'Fantasy', description: 'List Twist', id: '2' },
    { genre: 'Romance', description: 'List Twist', id: '3' },
    { genre: 'Sci-Fi', description: 'List Twist', id: '4' },
  ];

  const handleStoryPress = (storyId) => {
    // Handle navigation to the story based on the storyId
    // For example, you can use:
    navigation.navigate('Story', { storyId });
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
              onPress={() => handleStoryPress(story.id)}
            >
              <Text style={styles.subheading}>{story.genre}</Text>
              <Text style={styles.body}>{story.description}</Text>
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
    zIndex: 1,dex: 1,
  },
  backBtn: {
    width: 50,
    height: 50,
  },
  storyBody: {
    width: 350,
    padding: 20,
    marginTop: 0,
    marginLeft: -20,
    left: 0,
    color: 'white',
    fontSize: 24,
    fontFamily: 'MagicalNight',
    alignSelf: 'flex-start',
    flex: 1,
    // position: 'absolute'
  },
  cursor: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 20,
    height: 25,
  },
  menuContainer: {
    position: 'absolute',
    top: 200,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  tag: {
    position: 'absolute',
    top: 5,
    left: -30,
    width: 30,
    height: 56,
    backgroundColor: '#3B1609',
    borderRadius: 5,
    marginTop: 55,
  },
  tagInner: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 6,
    height: 6,
    backgroundColor: 'none',
    borderRadius: 3,
  },
  menu: {
    position: 'relative',
    width: 80,
    height: 235,
    backgroundColor: '#867452',
    borderRadius: 30,
    zIndex: 2,
  },
  menuContent: {
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  menuIcon: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#928263',
  },
  menuIconImage: {
    width: 30,
    height: 30,
  },
  menuIconActive: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#6B8DFF', // Change this to the desired color
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // You can adjust the opacity as desired
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3, // Make sure it appears above other elements
  },
  scrollViewStory: {
    width: 330,
    padding: 20,
    alignSelf: 'flex-start',
    flex: 1,
    height: 600,
    padding: 20,
    paddingTop: 0,
    marginTop: 210,
    left: 0,
    color: 'white',
    fontSize: 24,
    fontFamily: 'MagicalNight',
    alignSelf: 'flex-start',
    flex: 1,
  },
  
});
