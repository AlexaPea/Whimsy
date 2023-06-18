import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../../utils/GlobalStyles';

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

  return (
    <ImageBackground
      source={require('../../assets/bg/book.png')}
      style={styles.backgroundImage}
    >

    <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
    >
    <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
    </TouchableOpacity>


      {fontLoaded ? (
        <View style={styles.container}>
          <Text style={styles.heading}>The Whimsy Storybook</Text>
          <Text style={styles.body}>Discover user-curated gems: the finest handpicked short stories, poised to enchant you.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contents')}>
            <ImageBackground source={require('../../assets/btn/bg.png')} style={styles.btnBackground}>
              <Text style={styles.btnText}>Start Reading</Text>
            </ImageBackground>
        </TouchableOpacity>
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
    marginTop: 330
  },
  body: {
    color: 'white',
    width: 250,
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'center',
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
  button: {
    width: 257,
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:0,
    // paddingLeft:110,
    alignItems: 'center',
  },
  btnBackground:{
    resizeMode: 'cover', 
    width: 257,
    height: 60,
    borderRadius: 30,
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
    paddingTop:8
  },
});
