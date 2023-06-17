import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';

const Cover = ({navigation}) => {
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

  React.useEffect(() => {
    const handleSwipeRight = () => {
      navigation.navigate('Contents'); // Replace 'Contents' with the name of your contents screen component
    };
  
    const swipeRightListener = navigation.addListener('swipeRight', handleSwipeRight);
  
    return () => {
      swipeRightListener.remove();
    };
  }, [navigation]);
  

  return (
    <ImageBackground
      source={require('../../assets/bg/book.png')}
      style={styles.backgroundImage}
    >

        <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        onSwipeRight={() => navigation.navigate('Contents')} // Replace 'Contents' with the name of your contents screen component
        >
        <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
        </TouchableOpacity>


      {fontLoaded ? (
        <View style={styles.container}>
          <Text style={styles.heading}>The Whimsy Storybook</Text>
          <Text style={styles.body}>Discover user-curated gems: the finest handpicked short stories, poised to enchant you.</Text>
        </View>
      ) : null}
    </ImageBackground>
  );
}

export default Cover

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 48,
    color: 'white',
    width: 350,
    lineHeight: 50,
    textAlign: 'center',
  },
  body: {
    color: 'white',
    width: 250,
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
    zIndex: 1,
  },
  backBtn:{
    width: 50,
    height: 50
  }
});
