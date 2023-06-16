//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import Constants from 'expo-constants';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';

const HomeScreen = () => {
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

  const user = getCurrentUser()
  
  return (
    <ImageBackground
      source={require('../assets/bg/home.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Hey {user.displayName}!</Text>
        <Text style={styles.body}>Our favourite creator.</Text>

        <TouchableOpacity style={styles.logoutButton}  onPress={() => {signOutUser()}}>
            <Image source={require('../assets/logout-icon.png')} style={styles.logoutIcon} />
          </TouchableOpacity>
      </>
      ) : null}

 

    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 0,
    paddingHorizontal: 30,
    
  },
  heading: {
    fontFamily: 'Hensa', 
    fontSize: 48,
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
  logoutButton:{
    position: 'absolute',
    marginTop: 70,
    marginLeft: 340,
  },
  logoutIcon:{
    height: 40,
    width: 40
  }
})