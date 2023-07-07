import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../services/firebaseDb';
import BackgroundMusicPlayer from '../components/BackgroundMusicPlayer';

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const user = getCurrentUser();
  const [countdown, setCountdown] = useState('');

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

  useEffect(() => {
    const calculateCountdown = () => {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // Calculate the next month and year
      let nextMonth = currentMonth + 1;
      let nextYear = currentYear;
      if (nextMonth === 12) {
        nextMonth = 0;
        nextYear++;
      }

      const nextMonthDate = new Date(nextYear, nextMonth, 1);
      const timeRemaining = nextMonthDate.getTime() - today.getTime();

      // Convert milliseconds to days, hours, minutes, and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      setCountdown(countdownString);
    };

    calculateCountdown();

    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

            {/* Display the countdown timer */}
            <View style={styles.timerContainer}>
            <View style={styles.timerContainerStyle}>
              <Text style={styles.CountText}>CountDown</Text>
              <Text style={styles.compText}>Next Competition</Text>
              <Text style={styles.timerText}>{countdown}</Text>
              </View>
              <Text style={styles.paragraph}>Each month our we clear our library and make room for new masterpieces.</Text>
            </View>

           
          </>
        ) : null}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: 1250
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: '',
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
    marginTop: 690,
    marginLeft: 30,
    position: 'absolute',
  },
  featherImg: {
    width: 221,
    height: 118,
  },
  glass: {
    marginTop: 720,
    marginLeft: 220,
    position: 'absolute',
  },
  glassImg: {
    width: 146,
    height: 144,
  },
  gavel: {
    marginTop: 650,
    marginLeft: 60,
    position: 'absolute',
  },
  gavelImg: {
    width: 160,
    height: 124,
  },
  timerContainer: {
    position: 'absolute',
    top: 850,
    paddingTop: 20,
    alignSelf: 'flex-start',
    paddingRight: 30,
    paddingBottom: 10,

 
  },
  timerContainerStyle: {
   
    paddingTop: 20,
   width: 350,
    paddingLeft: 40,
    paddingRight: 30,
    paddingBottom: 30,
    backgroundColor: 'rgba(244, 238, 229, 0.2)',
 
  },
  timerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 300
  },
  CountText:{
    fontSize: 16,
    fontWeight: 400,
    color: 'white',
   
  },
  compText:{
    fontFamily: 'Hensa',
    fontSize: 32,
    color: 'white',
    paddingTop: 10,
    // lineHeight: 50,
  },
  paragraph:{
    fontSize: 16,
    color: 'white',
    paddingTop: 20,
    paddingLeft: 40
  }
});

export default HomeScreen;
