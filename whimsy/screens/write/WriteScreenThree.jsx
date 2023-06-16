import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import LibraryBookCard from '../../components/libraryBookCard'
import * as Font from 'expo-font';
import { globalStyles } from '../../utils/GlobalStyles';

const WriteScreenThree = ({ navigation, route }) => {
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

  const  [title, setTitle] = useState('');
  //const { genre, prompt } = route.params; // Extract genre and prompt from route params

  const continueToNextScreen = () => {
    navigation.navigate('WriteFour', { genre: route.params.genre, prompt: route.params.prompt, title: title });
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
        <Text style={styles.heading}>Title</Text>
        <Text style={styles.body}>Add a title for your story - but don’t worry, you can change it later.</Text>


        <TextInput 
        style={styles.input} 
        keyboardType='default'
        placeholderTextColor="rgba(255, 255, 255, 0.76)"
        placeholder='Title'
        defaultValue={title}    
        onChangeText={newValue => setTitle(newValue)}
        />

        <TouchableOpacity style={styles.button}  onPress={continueToNextScreen}>
          <ImageBackground source={require('../../assets/btn/bg.png')} style={globalStyles.btnBackground}>
            <Text style={globalStyles.btnText}>Continue</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )}
  </ImageBackground>
  )
}

export default WriteScreenThree

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
    paddingTop: 200,
    paddingLeft: 20,
    lineHeight: 50,
    marginBottom: -10,
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 40,
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
    marginTop: -0,
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
  },
  input:{
    width: 325,
    height: 60,
    backgroundColor: 'rgba(230, 232, 230, 0.24)',
    borderWidth: 5,
    borderColor: 'rgba(130, 94, 49, 0.94)',
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom:0,
    marginLeft:10,
    color: 'white'
  },
})