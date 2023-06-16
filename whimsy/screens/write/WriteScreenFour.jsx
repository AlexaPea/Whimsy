import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import LibraryBookCard from '../../components/libraryBookCard'
import * as Font from 'expo-font';
import { globalStyles } from '../../utils/GlobalStyles';

const WriteScreenFour = ({ navigation, route }) => {
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

  const continueToNextScreen = () => {
    navigation.navigate('WriteFive', { genre: route.params.genre, prompt: route.params.prompt, title: route.params.title });
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
        <Text style={styles.heading}>Time to start writing...</Text>
        <Text style={styles.body}>Now that you’ve been given some direction, it’s time for you to write another dream worthy bedtime story.</Text>
        {/* <Text style={styles.body}>{route.params.genre}|{route.params.prompt}|{route.params.title}</Text> */}


        <TouchableOpacity style={styles.button}  onPress={continueToNextScreen}>
          <ImageBackground source={require('../../assets/btn/bg.png')} style={globalStyles.btnBackground}>
            <Text style={globalStyles.btnText}>Get Creating</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )}
  </ImageBackground>
  )
}

export default WriteScreenFour

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
    paddingTop: 50,
    paddingLeft: 20,
    lineHeight: 50,
    marginBottom: -10,
  },
  body: {
    color: 'white',
    width: 300,
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 40,
    lineHeight: 25
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
    paddingTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -230,
    marginBottom: -25
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
})