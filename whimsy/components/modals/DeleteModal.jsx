import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { deleteStoryFromCollection } from '../../services/firebaseDb';

const DeleteModal = ({ navigation, onClose, storyId  }) => {
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

  const handleDeleteButtonPress = async () => {
    try {
      await deleteStoryFromCollection(storyId);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Something went wrong: ' + error);
    }
    
  };


  return (
    <View style={styles.container}>
      <View style={styles.exitButtonContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={onClose}>
          <ImageBackground source={require('../../assets/exit-icon.png')} style={styles.exitButtonImage} />
        </TouchableOpacity>
      </View>
      {fontLoaded ? (
        <>
          <View style={styles.content}>
            <Text style={styles.heading}>Are you sure?</Text>
            <Text style={styles.body}>Once your story is deleted, you won’t be able to retrieve it.</Text>
            <TouchableOpacity style={styles.button}>
              <ImageBackground source={require('../../assets/btn/bg.png')} style={styles.btnBackground}>
                <Text style={styles.btnText} onPress={handleDeleteButtonPress}>Delete</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C29753',
    height: 280,
    width: 350,
    padding: 20,
    paddingLeft: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  exitButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  exitButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 42,
    color: 'white',
    width: 350,
    paddingTop: 25,
    paddingLeft: 0,
    lineHeight: 50,
    textAlign: 'center',
  },
  body: {
    color: 'white',
    width: 250,
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: 207,
    height: 59,
    borderRadius: 20,
    marginTop: -20,
    paddingTop: 0,
    marginLeft: -50,
    justifyContent: 'center',
  },
  btnBackground: {
    resizeMode: 'contain',
    width: 257,
    height: 59,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Hensa',
    fontSize: 22,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
});
