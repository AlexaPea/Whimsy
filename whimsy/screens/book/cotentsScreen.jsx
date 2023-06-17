import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';

const Contents = ({navigation}) => {
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
          <Text style={styles.heading}>Contents: </Text>
          <Text style={styles.body}>Embrace the charm of monthly genre gems, handpicked to offer you the absolute best.</Text>
        </View>
{/* 
        <View style={styles.ContentsContainer}>
            <Text style={styles.heading}>Contents: </Text>
             <Text style={styles.body}>Embrace the charm of monthly genre gems, handpicked to offer you the absolute best.</Text>
        </View> */}
        </>
      ) : null}
    </ImageBackground>
  );
}

export default Contents

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
