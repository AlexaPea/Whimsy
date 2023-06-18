import { ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MyStoriesBookCard from '../components/myStoriesBookCard'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import { getCurrentUser } from '../services/firebaseAuth';
import { getCurrentUserStories } from '../services/firebaseDb'
import { getCurrentUserDrafts } from '../services/firebaseDb';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const OwnStoryScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('myStories');

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const user = getCurrentUser();
  const id = user.uid;

  const [myStories, setMyStories] = useState([]);
  const [myDrafts, setMyDrafts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserStories();
      getUserDrafts();

      return () => {
        // cleanup when not viewing the screen
      };
    }, [])
  );

  const getUserStories = async () => {
    setRefreshing(true);
    const stories = await getCurrentUserStories(user.uid);
    console.log(stories);
    setMyStories(stories);
    setRefreshing(false);
  };

  const getUserDrafts = async () => {
    setRefreshing(true);
    const drafts = await getCurrentUserDrafts(user.uid);
    console.log(drafts);
    setMyDrafts(drafts); // Update the state to myDrafts instead of myStories
    setRefreshing(false);
  };
  


  useEffect(() => {
    getUserStories();
    getUserDrafts();
  }, []);

  const handleButtonPress = () => {
    console.log("pressed");
  };

  return (
    <ImageBackground
      source={require('../assets/bg/general.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded && (
        <View>
          <Text style={styles.heading}>Your Archives</Text>
          <Text style={styles.body}>Let's create magic.</Text>

          <View style={styles.createContainer}>
            <Text style={styles.headingTwo}>Get Creating</Text>
            <Text style={styles.bodyTwo}>Write your own bedtime stories and contribute to the whimsy library.</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WriteOne')}>
              <ImageBackground source={require('../assets/btn/bg.png')} style={styles.btnBackground}>
                <Text style={styles.btnText}>Start Story</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <Text style={[styles.tabText, selectedTab === 'myStories' ? { opacity: 1 } : { opacity: 0.4 }]} onPress={() => setSelectedTab('myStories')}>My Stories</Text>
            <Text style={[styles.tabText, selectedTab === 'myDrafts' ? { opacity: 1 } : { opacity: 0.4 }]} onPress={() => setSelectedTab('myDrafts')}>My Drafts</Text>
          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView>
              {selectedTab === 'myStories' ? (
                myStories.map((story, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ReadOwnStory', { story })}
                  >
                    <MyStoriesBookCard data={story} />
                  </TouchableOpacity>
                ))
              ) : (
                myDrafts.map((story, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ReadOwnStory', { story })}
                  >
                    <MyStoriesBookCard data={story} />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default OwnStoryScreen;

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
    paddingTop: 15,
    paddingLeft: 20,
    lineHeight: 50,
    marginTop: -20
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
  body: {
    color: 'white',
    width: 350,
    paddingLeft: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  bodyTwo: {
    color: 'white',
    width: 300,
    paddingTop: 0,
    paddingBottom: 40,
  },
  scrollViewContainer: {
    height: 258,
    marginTop: 20
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
    borderRadius: 20
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 120,
    marginTop: 30
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  }
});
