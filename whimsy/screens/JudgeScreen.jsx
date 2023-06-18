import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';
import { getAllStoriesFromCollection, getCurrentFeaturedStories } from '../services/firebaseDb';
import { getCurrentUser } from '../services/firebaseAuth';
import CompBookCard from '../components/compBookCard';
import LibraryBookCard from '../components/libraryBookCard';
import { Picker } from '@react-native-picker/picker';
import orderBy from 'lodash/orderBy';
import deleteCollectionData from '../services/firebaseDb'

const JudgeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('featStories');
  const [featStories, setFeatStories] = useState([]);
  const [allStories, setAllStories] = useState({});
  const [selectedGenre, setSelectedGenre] = useState('All');
  const genres = ['All', 'Fantasy', 'Sci-Fi', 'Classic Twist', 'Romance'];

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const getAllStories = async () => {
    const stories = await getAllStoriesFromCollection(user.uid);
  
    const topStoriesByGenre = {};
    genres.forEach((genre) => {
      const storiesByGenre = stories.filter(
        (story) => genre === 'All' || story.genre === genre
      );
      const topStories = orderBy(storiesByGenre, 'votes', 'desc').slice(0, 10);
      topStoriesByGenre[genre] = topStories;
    });
  
    setAllStories(topStoriesByGenre);
  };
  
  useEffect(() => {
    getAllStories();
    getFeatures();
  }, [selectedGenre]); 

  const getFeatures = async () => {
    const features = await getCurrentFeaturedStories(user.uid);
    setFeatStories(features);
  };

  const user = getCurrentUser();

  useEffect(() => {
    getAllStories();
    getFeatures();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllStories();
      getFeatures();

      return () => {
        // cleanup when not viewing the screen
      };
    }, [])
  );
  
  
  const handleClearLibrary = async () => {

    console.log("click");
    // Clear the "stories" collection
    await deleteCollectionData('stories');

    // Clear the "likes" collection
    await deleteCollectionData('likes');

    // Clear the "bookmarks" collection
    await deleteCollectionData('bookmarks');

    // Refresh the data
    getAllStories();
    getFeatures();
  };

  return (
    <ImageBackground
      source={require('../assets/bg/general.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
          <Text style={styles.heading}>Judge of Tales</Text>
          <Text style={styles.body}>Select the most captivating stories for Whimsy's storybook.</Text>

          <View style={styles.createContainer}>
            <Text style={styles.headingTwo}>Monthly Reset</Text>
            <Text style={styles.bodyTwo}>Embrace the beauty of new beginnings as we bid farewell to old stories.</Text>

            <TouchableOpacity style={styles.button} onPress={handleClearLibrary}>
            <ImageBackground source={require('../assets/btn/bg.png')} style={styles.btnBackground}>
              <Text style={styles.btnText}>Clear Library</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabTextContainer,
                selectedTab === 'featStories' ? styles.activeTab : null,
              ]}
              onPress={() => setSelectedTab('featStories')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'featStories' ? styles.activeTabText : null,
                ]}
              >
                Current Features
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabTextContainer,
                selectedTab === 'allStories' ? styles.activeTab : null,
              ]}
              onPress={() => setSelectedTab('allStories')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'allStories' ? styles.activeTabText : null,
                ]}
              >
                Up & Coming
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollViewContainer}>
            {selectedTab === 'featStories' ? (
              featStories
                .filter(
                  (story) => selectedGenre === 'All' || story.genre === selectedGenre
                )
                .map((story, index) => {
                  const isCreator = story.userId === user.uid;
                  let destinationScreen = '';

                  if (isCreator && userRole === 'judge') {
                    destinationScreen = 'JudgeStory';
                  } else if (isCreator) {
                    destinationScreen = 'JudgeStory';
                  } else {
                    destinationScreen = 'JudgeStory';
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate(destinationScreen, { story })}
                    >
                      <LibraryBookCard order={index + 1} data={story} />
                    </TouchableOpacity>
                  );
                })
            ) : (
              <>
                {selectedGenre === 'All' ? (
                  genres.map((genre) => (
                    <View key={genre}>
                      {allStories[genre].map((story, index) => {
                        const isCreator = story.userId === user.uid;
                        let destinationScreen = '';

                        if (isCreator && userRole === 'judge') {
                          destinationScreen = 'JudgeStory';
                        } else if (isCreator) {
                          destinationScreen = 'JudgeStory';
                        } else {
                          destinationScreen = 'JudgeStory';
                        }

                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate(destinationScreen, { story })}
                          >
                            <CompBookCard number={index < 10 ? index + 1 : ''} data={story} />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))
                ) : (
                  <View key={selectedGenre}>
                    {allStories[selectedGenre].map((story, index) => {
                      const isCreator = story.userId === user.uid;
                      let destinationScreen = '';

                      if (isCreator && userRole === 'judge') {
                        destinationScreen = 'JudgeStory';
                      } else if (isCreator) {
                        destinationScreen = 'JudgeStory';
                      } else {
                        destinationScreen = 'JudgeStory';
                      }

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => navigation.navigate(destinationScreen, { story })}
                        >
                          <CompBookCard number={index < 10 ? index + 1 : ''} data={story} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedGenre}
              onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              style={styles.dropdown}
            >
              {genres.map((genre, index) => (
                <Picker.Item key={index} label={genre} value={genre} />
              ))}
            </Picker>
          </View>
        </>
      ) : null}
    </ImageBackground>
  );
};

export default JudgeScreen;

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
    paddingTop: 70,
    paddingLeft: 20,
    lineHeight: 50,
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: 25,
  },
  tabTextContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    opacity: 0.4
  },
  activeTab: {
    opacity: 1
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
    opacity: 1
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 545,
    marginLeft: 40,
    height: 210,
    position: 'absolute'
  },
  dropdownContainer: {
    position: 'absolute',
    top: 475,
    left: 50,
    zIndex: 1,
    width: 150,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  dropdown: {
    color: 'white',
    tintColor: 'blue',
  },
  genreTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: 20,
    marginTop: 30
  },
  button: {
    width: 207,
    height: 59,
    borderRadius: 20,
    marginTop: -20,
    paddingTop: 0,
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
    paddingTop: 8
  },
  createContainer: {
    backgroundColor: '#C29753',
    height: 220,
    width: 350,
    padding: 20,
    paddingLeft: 30,
    borderRadius: 20,
    marginTop: -15
  },
  bodyTwo: {
    color: 'white',
    width: 300,
    paddingTop: 0,
    paddingBottom: 40,
  },
  headingTwo: {
    fontFamily: 'Hensa',
    fontSize: 32,
    color: 'white',
    width: 350,
    paddingTop: 0,
    // paddingLeft: 20,
    lineHeight: 50,
  },
});