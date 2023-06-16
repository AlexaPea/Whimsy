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
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Font from 'expo-font';
import { getCurrentUser } from '../../services/firebaseAuth';
import { updateStory } from '../../services/firebaseDb';
import DeleteModal from '../../components/modals/DeleteModal';

const CustomTextInput = React.forwardRef(({ style, ...props }, ref) => {
  return <TextInput ref={ref} style={style} {...props} />;
});

const ReadOwnStory = ({ navigation, route }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState('');
  const [story, setStory] = useState(route.params.story);
  const [title, setTitle] = useState(route.params.title);
  const [editableTitle, setEditableTitle] = useState(story.title);
  const [editableBody, setEditableBody] = useState(story.story);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Add deleteModalVisible state

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
      inputRange: [0, 0.2],
      outputRange: [220 + 30, 0],
    }).start();
  };

  const editStory = async () => {
    setEditMode(true);
    setEditableTitle(story.title);
  };

  const updateStoryData = async () => {
    try {
      await updateStory(story.id, editableTitle, editableBody);
      setEditMode(false);
      setEditableBody(editableBody);
      setEditableTitle(editableTitle);
      const updatedStory = { ...story, title: editableTitle, story: editableBody };
      setStory(updatedStory);
    } catch (error) {
      console.log('Something went wrong: ' + error);
    }
  };

  const handleDeleteButtonPress = () => {
    setDeleteModalVisible(true);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageBackground source={require('../../assets/bg/page.png')} style={styles.backgroundImage}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/backBtn.png')} style={styles.backBtn} />
        </TouchableOpacity>

        {fontLoaded && (
          <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}
          >
            {editMode ? (
              <CustomTextInput
                style={styles.heading}
                value={editableTitle}
                onChangeText={(text) => setEditableTitle(text)}
              />
            ) : (
              <Text style={styles.heading}>{story.title}</Text>
            )}

            {editMode ? (
              <CustomTextInput
                style={styles.storyBody}
                multiline
                value={editableBody}
                onChangeText={(text) => setEditableBody(text)}
              />
            ) : (
              <Text style={styles.storyBody}>{story.story}</Text>
            )}
          </ScrollView>
        )}

        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [
                {
                  translateX: slideAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [220 + 30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.tag}
              onPress={toggleMenu}
            >
              <View style={styles.tagInner} />
            </TouchableOpacity>

            <View style={styles.menuContent}>
              <TouchableOpacity
                style={editMode ? styles.menuIconActive : styles.menuIcon}
                onPress={editStory}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/edit-icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={updateStoryData}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/complete-icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={handleDeleteButtonPress}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/bin-icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {deleteModalVisible && (
        <View style={styles.modalOverlay}>
          <DeleteModal onClose={() => setDeleteModalVisible(false)} />
        </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ReadOwnStory;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    justifyContent: 'center',
    lineHeight: 50,
    marginBottom: -10,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -25 }],
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
    width: 320,
    height: 700,
    padding: 20,
    marginTop: 150,
    left: 0,
    color: 'white',
    fontSize: 24,
    fontFamily: 'MagicalNight',
    alignSelf: 'flex-start',
    flex: 1,
    // position: 'absolute'
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
    top: 35,
    left: -30,
    width: 30,
    height: 56,
    backgroundColor: '#3B1609',
    borderRadius: 5,
    marginTop: 55,
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
    height: 235,
    backgroundColor: '#867452',
    borderRadius: 30,
    zIndex: 2,
  },
  menuContent: {
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  menuIcon: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#928263',
  },
  menuIconImage: {
    width: 30,
    height: 30,
  },
  menuIconActive: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#6B8DFF', // Change this to the desired color
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // You can adjust the opacity as desired
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3, // Make sure it appears above other elements
  }
  
});
