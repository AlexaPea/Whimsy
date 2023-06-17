import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import LibraryBookCard from '../components/libraryBookCard';
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllStoriesFromCollection } from '../services/firebaseDb';
import { getCurrentUser } from '../services/firebaseAuth';

const LibraryScreen = () => {
  const user = getCurrentUser();
  const userUid = user.uid;
  // console.log(userUid);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [stories, setStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const userId = userUid; 
  const [subHeadingText, setSubHeadingText] = useState('All Stories');


  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, [selectedGenre, refreshing]);

  useFocusEffect(
    useCallback(() => {
      getAllStories();
      return () => {
        // Cleanup when not viewing the screen
      };
    }, [selectedGenre, navigation, ])
  );

  const getAllStories = async () => {
    setRefreshing(true);
    // console.log("Getting data");
    const allStories = await getAllStoriesFromCollection();
    setStories(allStories);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllStories();
  }, []);

  const handleButtonPress = (genre) => {
    setSelectedGenre(genre);
    setSubHeadingText(genre ? genre : 'All Stories');
  };

  return (
    <ImageBackground
      source={require('../assets/bg/general.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded && (
        <View>
          <Text style={styles.heading}>Library</Text>
          <Text style={styles.body}>Let’s find the perfect story for you.</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.rowOne}>
              <TouchableOpacity
                style={[
                  styles.book,
                  styles.book1,
                  selectedGenre === 'Fantasy' && { backgroundColor: '#6B8DFF' }
                ]}
                onPress={() => handleButtonPress('Fantasy')}
              >
                <Text style={styles.bookText}>Fantasy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.book,
                  styles.book2,
                  selectedGenre === 'Sci-Fi' && { backgroundColor: '#6B8DFF' }
                ]}
                onPress={() => handleButtonPress('Sci-Fi')}
              >
                <Text style={styles.bookText}>Sci-Fi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowTwo}>
              <TouchableOpacity
                style={[
                  styles.book,
                  styles.book3,
                  selectedGenre === 'Classic Twist' && { backgroundColor: '#6B8DFF' }
                ]}
                onPress={() => handleButtonPress('Classic Twist')}
              >
                <Text style={[styles.bookText, styles.bookTextVertical]}>Classic Twist</Text>
              </TouchableOpacity>

              <View style={styles.rowThree}>
                <TouchableOpacity
                  style={[
                    styles.book,
                    styles.book4,
                    selectedGenre === '' && { backgroundColor: '#6B8DFF' }
                  ]}
                  onPress={() => handleButtonPress('')}
                >
                  <Text style={styles.bookText}>All Stories</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.book,
                    styles.book5,
                    selectedGenre === 'Romance' && { backgroundColor: '#6B8DFF' }
                  ]}
                  onPress={() => handleButtonPress('Romance')}
                >
                  <Text style={styles.bookText}>Romance</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.subHeading}>{subHeadingText}</Text>
          <ScrollView style={styles.scrollView}>
            {stories
              .filter(story => !selectedGenre || story.genre === selectedGenre)
              .map((story, index) => {
                const isCreator = story.userId === userId;
                const destinationScreen = isCreator ? 'ReadOwnStory' : 'ReadStory';

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(destinationScreen, { story })}
                  >
                    <LibraryBookCard data={story} />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
    </ImageBackground>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 52,
    color: 'white',
    width: 350,
    paddingTop: 65,
    paddingLeft: 20,
    lineHeight: 50,
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 40,
  },
  scrollView: {
    height: 240,
    position: 'absolute',
    marginTop: 510
  },
  subHeading: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: 20,
    position: 'absolute',
    marginTop: 470
  },
  buttonContainer: {
    flex: 1,
    gridColumnGap: 0,
    gridRowGap: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 400,
  },
  book: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  book1: {
    width: '55%',
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
    width: 243,
    backgroundColor: '#9F3824',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  book5: {
    height: 94,
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
});
