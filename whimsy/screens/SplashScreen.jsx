//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';


const SplashScreen = ({ navigation }) => {
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

  // return the rendering of views
  return (
    <ImageBackground
      source={require('../assets/bg/splash.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Welcome to Whimsy!</Text>
        <Text style={styles.body}>Bedtime stories that spark dreams and inspire creativity.</Text>

        <TouchableOpacity style={styles.button}   onPress={() => navigation.navigate('Login')}>
          <ImageBackground source={require('../assets/btn/bg.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        
        </>
      ) : null}

 

    </ImageBackground>
  );
}

// exporting component
export default SplashScreen

// styling component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    alignContent: 'center'
  },
  heading: {
    fontFamily: 'Hensa', 
    fontSize: 52,
    color: 'white',
    width: 350,
    textAlign: 'center',
    paddingTop: 440,
    paddingLeft: 95,
    lineHeight: 50
  },
  body: {
    color: 'white',
    width: 350,
    textAlign: 'center',
    paddingLeft: 65,
    paddingTop: 20,
    // fontFamily: 'Open Sans Hebrew'
  },
  button: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop:60,
    paddingLeft:110,
    alignItems: 'center',
  },
  buttonSecondary: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:-0,
    paddingLeft:110,
    alignItems: 'center',
  },
  btnBackground:{
    resizeMode: 'cover', 
    width: 307,
    height: 69,
    borderRadius: 20,
    padding:10,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'Hensa', 
    fontSize: 28,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:8,
  
  
  }
});
