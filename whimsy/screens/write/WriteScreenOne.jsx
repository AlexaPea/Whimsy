import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LibraryBookCard from '../../components/libraryBookCard'
import * as Font from 'expo-font';
import { globalStyles } from '../../utils/GlobalStyles';


const WriteScreenOne = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const continueToNextScreen = () => {
    navigation.navigate('WriteTwo', { genre: selectedGenre });
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
        <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
      </TouchableOpacity>

      {fontLoaded && (
        <View style={styles.bodyContainer}>
          <Text style={styles.heading}>Pick a Genre</Text>
          <Text style={styles.body}>Time to write a new adventure.</Text>


          <View style={styles.buttonContainer}>
            <View style={styles.rowOne}>
              <TouchableOpacity
                style={[styles.book, styles.book1, selectedGenre === 'Sci-Fi' ? styles.selectedBook : null]}
                onPress={() => selectGenre('Sci-Fi')}
              >
                <Text style={styles.bookText}>Sci-Fi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowTwo}>
              <TouchableOpacity
                style={[styles.book, styles.book3, selectedGenre === 'Classic Twist' ? styles.selectedBook : null]}
                onPress={() => selectGenre('Classic Twist')}
              >
                <Text style={[styles.bookText, styles.bookTextVertical]}>Classic Twist</Text>
              </TouchableOpacity>

              <View style={styles.rowThree}>
                <TouchableOpacity
                  style={[styles.book, styles.book1, selectedGenre === 'Fantasy' ? styles.selectedBook : null]}
                  onPress={() => selectGenre('Fantasy')}
                >
                  <Text style={styles.bookText}>Fantasy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.book, styles.book5, selectedGenre === 'Romance' ? styles.selectedBook : null]}
                  onPress={() => selectGenre('Romance')}
                >
                  <Text style={styles.bookText}>Romance</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={continueToNextScreen}>
            <ImageBackground source={require('../../assets/btn/bg.png')} style={globalStyles.btnBackground}>
              <Text style={globalStyles.btnText}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  )
}

export default WriteScreenOne

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
  bodyContainer: {
    marginTop: 280,
    flex: 1
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 52,
    color: 'white',
    width: 350,
    paddingTop: 65,
    paddingLeft: 20,
    lineHeight: 50,
    marginBottom: -10,
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 40,
  },
  scrollView: {
    height: 100,
  },
  subHeading: {
    color: 'white',
    fontWeight: 600,
    fontSize: 18,
    paddingLeft: 20,

  },
  buttonContainer: {
    flex: 1,
    gridColumnGap: 0,
    gridRowGap: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 50
  },
  book: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5

  },
  selectedBook: {
    backgroundColor: '#6B8DFF'
  },
  book1: {
    backgroundColor: '#B68C4C',
    height: 69,
  },

  book2: {
    width: '15%',
    height: 69,
    backgroundColor: '#9F3824',

  },
  book3: {
    height: 194,
    width: 33,
    backgroundColor: '#9F3824',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  book4: {
    height: 294,
    width: 543,
    backgroundColor: '#6B8DFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  book5: {
    height: 54,
    backgroundColor: '#B68C4C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 69,
  },
  rowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  rowThree: {
    width: '70%'

  },
  bookTextVertical: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }],
  },
  bookText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 357,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop: 20,
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
  backBtn: {
    width: 50,
    height: 50
  }
})
