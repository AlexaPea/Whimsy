import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../services/firebaseDb';
import BackgroundMusicPlayer from '../components/BackgroundMusicPlayer';

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const user = getCurrentUser();

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await getUserRoleFromDatabase(user.uid);
        console.log("Role: " + userRole);
        setUserRole(userRole);
      } catch (error) {
        console.log("Error retrieving current user:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);

  const navigateToOwnStoryScreen = () => {
    navigation.navigate('Write');
  };

  const navigateToLibraryScreen = () => {
    navigation.navigate('Library');
  };

  const navigateToJudgeScreen = () => {
    navigation.navigate('Judge');
  };

  return (
    <ImageBackground
      source={require('../assets/bg/home.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
          <Text style={styles.heading}>Hey {user.displayName}!</Text>
          <Text style={styles.body}>Our favourite {userRole}.</Text>

          <BackgroundMusicPlayer />

          <TouchableOpacity style={styles.logoutButton} onPress={signOutUser}>
            <Image source={require('../assets/logout-icon.png')} style={styles.logoutIcon} />
          </TouchableOpacity>

          {userRole === 'creator' ? (
            <TouchableOpacity style={styles.feather} onPress={navigateToOwnStoryScreen}>
              <Image source={require('../assets/feather.png')} style={styles.featherImg} />
            </TouchableOpacity>
          ) : userRole === 'judge' ? (
            <TouchableOpacity style={styles.gavel} onPress={navigateToJudgeScreen}>
              <Image source={require('../assets/gavel.png')} style={styles.gavelImg} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.glass} onPress={navigateToLibraryScreen}>
            <Image source={require('../assets/glass.png')} style={styles.glassImg} />
          </TouchableOpacity>
        </>
      ) : null}
    </ImageBackground>
  );
};

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
    // fontFamily: 'Open Sans'
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
  feather: {
    marginTop: 600,
    marginLeft: 30,
    position: 'absolute',
  },
  featherImg: {
    width: 221,
    height: 118,
  },
  glass: {
    marginTop: 620,
    marginLeft: 220,
    position: 'absolute',
  },
  glassImg: {
    width: 146,
    height: 144,
  },
  gavel: {
    marginTop: 600,
    marginLeft: 60,
    position: 'absolute',
  },
  gavelImg: {
    width: 160,
    height: 124,
  },
});

export default HomeScreen;
