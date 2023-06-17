import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Alert
} from 'react-native';
import * as Font from 'expo-font';
import { getCurrentUser } from '../../services/firebaseAuth';
import { addBedTimeStoryToCollection } from '../../services/firebaseDb';
import { addDraftToCollection } from '../../services/firebaseDb';


const CustomTextInput = React.forwardRef(({ style, ...props }, ref) => {
  return <TextInput ref={ref} style={style} {...props} />;
});

const ReadStory = ({ navigation, route }) => {

  
    const {story} = route.params;
    // console.log(story);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState("");

  const loadFonts = async () => {
    await Font.loadAsync({
      Hensa: require('../../assets/fonts/Hensa.ttf'),
      MagicalNight: require('../../assets/fonts/MagicalNight.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);

    Animated.timing(slideAnimation, {
      toValue: menuVisible ? 0 : 0.34,
      duration: 300,
      useNativeDriver: true,
      inputRange: [0, 0.2], // Update the input range
      outputRange: [220 + 30, 0], // Include the width of the tag (30) in the translation
    }).start();
  };




  return (
    <ImageBackground
      source={require('../../assets/bg/page.png')}
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
      </TouchableOpacity>

      {fontLoaded && (
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <View style={styles.page}>
            <View style={styles.bodyContainer}>
              <Text style={styles.heading}>{story.title}</Text>
              <Text style={styles.heading}>Title</Text>
              <Text style={styles.storyBody}>{story.story}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Tag and Menu */}
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [
              {
                translateX: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [220 + 30, 0], // Include the width of the tag (30) in the translation
                }),
              },
            ],
          },
        ]}
      >
        {/* Tag */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.tag} onPress={toggleMenu}>
            <View style={styles.tagInner} />
          </TouchableOpacity>

          {/* Menu */}
          <View style={styles.menuContent}>
            {/* Menu content */}
            <TouchableOpacity style={styles.menuIcon} >
              <Image source={require('../../assets/save-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuIcon}>
              <Image source={require('../../assets/heart-icon2.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default ReadStory;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    display: 'flex',
  },
  scrollView: {
    height: height,
  },
  scrollViewContent: {
    flex: 1,
    width: width * 2,
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 80,
    flex: 1,
    alignItems: 'center',

  },
  heading: {
    fontFamily: 'Hensa',
    fontSize: 42,
    color: 'white',
    width: 250,
    paddingTop: 0,
    paddingLeft: 0,
    lineHeight: 50,
    marginBottom: -10,
    marginLeft: -50,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 40,
    zIndex: 1,
  },
  backBtn: {
    width: 50,
    height: 50,
  },
  storyBody: {
    width: 400,
    height: 700,
    padding: 20,
    marginTop: 30,
    color: 'white',
    fontSize: 24,
    fontFamily: 'MagicalNight'
  },
  cursor: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 20,
    height: 25,
  },
  menuContainer: {
    position: 'absolute',
    top: 200,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  tag: {
    position: 'absolute',
    top: 0,
    left: -30,
    width: 30,
    height: 56,
    backgroundColor: '#3B1609',
    borderRadius: 5,
    marginTop:55,
  },
  tagInner: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 6,
    height: 6,
    backgroundColor: 'none',
    borderRadius: 3,
  },
  menu: {
    position: 'relative',
    width: 80,
    height: 165,
    backgroundColor: '#867452',
    borderRadius: 30,
    marginTop: 10,
    zIndex: 2,
  },
  menuContent: {
    paddingTop: 35,
    paddingHorizontal: 10,
  },
  menuIcon: {
    marginBottom: 25,
    alignItems: 'center',
  },
});
