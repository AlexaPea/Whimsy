import React, { useState, useRef, useEffect } from 'react';
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
import { updateDraft, deleteDraftFromCollection, addBedTimeStoryToCollection } from '../../services/firebaseDb';
import DeleteDraftModal from '../../components/modals/DeleteDraftModal';


const CustomTextInput = React.forwardRef(({ style, ...props }, ref) => {
  return <TextInput ref={ref} style={style} {...props} />;
});

const ReadOwnDraft = ({ navigation, route }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState('');
  const [storyId, setStoryId] = useState(route.params.story.id);
  const [story, setStory] = useState(route.params.story);
  const [title, setTitle] = useState(route.params.title);
  const [editableTitle, setEditableTitle] = useState(story.title);
  const [editableBody, setEditableBody] = useState(story.story);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Add deleteModalVisible state
  const [isCompleteClicked, setIsCompleteClicked] = useState(false);
  const [isCompleteEditClicked, setIsCompleteEditClicked] = useState(false);
  const [isBinClicked, setIsBinClicked] = useState(false);
  const [activeEditCompleteButton, setActiveEditCompleteButton] = useState('');
  const [activeCompleteButton, setActiveCompleteButton] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [activeBinButton, setActiveBinButton] = useState('');
 console.log(storyId);

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

  const updateDraftData = async () => {
    try {
      await updateDraft(story.id, editableTitle, editableBody);
      setEditMode(false);
      setEditableBody(editableBody);
      setEditableTitle(editableTitle);
      const updatedStory = { ...story, title: editableTitle, story: editableBody };
      setStory(updatedStory);

      // Activate the "Completed" button
      setActiveButton('completed');

      // Revert back after a second
      setTimeout(() => {
        setActiveButton('');
      }, 1000);

    } catch (error) {
      console.log('Something went wrong: ' + error);
    }
  };

  const deleteStoryModal = () => {
    setDeleteModalVisible(true); // Show the delete modal
  };

  const handleCompleteClick = () => {
    setIsCompleteEditClicked(!isCompleteEditClicked);
    // Activate the "Completed" button
    setActiveCompleteButton('completed');

    // Revert back after a second
    setTimeout(() => {
      setActiveCompleteButton('');
    }, 1000);
  };

  const handleCompleteEditClick = () => {
    setIsCompleteEditClicked(!isCompleteEditClicked);
    // Activate the "Completed" button
    setActiveEditCompleteButton('completed');

    // Revert back after a second
    setTimeout(() => {
      setActiveEditCompleteButton('');
    }, 1000);
  };

  const completeStory = async () => {
    if (story) {
      var creatorInfo = getCurrentUser();
  
      var BedTimeStory = {
        title: story.title,
        genre: story.genre,
        prompt: story.prompt,
        story: story.story,
        creator: creatorInfo.displayName,
        userId: creatorInfo.uid,
        votes: 0,
        time: Date.now(),
      };
  
      console.log("Draft Story: " + JSON.stringify(BedTimeStory));
  
      const success = await addBedTimeStoryToCollection(BedTimeStory);
  console.log(success);
      if (success) {
        console.log("Added story successfully");
  
        deleteDraftFromCollection(storyId)
          .then(() => {
            console.log("Story deleted successfully");
            setLoading(false);
            navigation.navigate('Home');
          })
          .catch(error => {
            console.log("Something went wrong: " + error);
            // Handle the error appropriately
          });
      } else {
        // console.log("Oops.... adding story");
        // setLoading(true)
        //navigation.navigate('Home');
        // Alert.alert("Oops! Something went wrong")
      }
    } else {
      Alert.alert("Oops! Please add all the project info");
    }
  };
  

  const handleBinClick = () => {
    setIsBinClicked(!isBinClicked);
          // Activate the "Completed" button
          setActiveBinButton('completed');

          // Revert back after a second
          setTimeout(() => {
            setActiveBinButton('');
          }, 1000);
    
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
                multiline
                onChangeText={(text) => setEditableTitle(text)}
              />
            ) : (
              <Text style={styles.heading}>{story.title}</Text>
            )}

            {editMode ? (
              <ScrollView style={styles.scrollViewStory}>
                <CustomTextInput
                  style={styles.storyBody}
                  multiline
                  scrollView
                  value={editableBody}
                  onChangeText={(text) => setEditableBody(text)}
                />
              </ScrollView>
            ) : (
              <ScrollView style={styles.scrollViewStory}>
                <Text style={styles.storyBody}>{story.story}</Text>
              </ScrollView>
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
                 style={activeEditCompleteButton === 'completed' ? styles.menuIconClicked : styles.menuIcon}
                onPress={() => {
                  updateDraftData();
                  handleCompleteEditClick();
                  ;
                }}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/save-edit.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                 style={activeCompleteButton === 'completed' ? styles.menuIconClicked : styles.menuIcon}
                onPress={() => {
                  completeStory();
                  handleCompleteClick();
                }}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/complete-icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={activeBinButton === 'completed' ? styles.menuIconClicked : styles.menuIcon}
                onPress={() => {
                  deleteStoryModal();
                  handleBinClick();
                }}
              >
                <Image style={styles.menuIconImage} source={require('../../assets/bin-icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {deleteModalVisible && (
          <View style={styles.modalOverlay}>
            <DeleteDraftModal onClose={() => setDeleteModalVisible(false)} storyId={storyId} navigation={navigation} />
          </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ReadOwnDraft;

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
    flex: 1,
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
    width: 350,
    padding: 20,
    marginTop: 0,
    marginLeft: -20,
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
    height: 300,
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
    backgroundColor: '#6B8DFF',
  },
  menuIconClicked: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#6B8DFF',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // You can adjust the opacity as desired
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3, // Make sure it appears above other elements
  },
  scrollViewStory: {
    width: 330,
    padding: 20,
    alignSelf: 'flex-start',
    flex: 1,
    height: 600,
    padding: 20,
    paddingTop: 0,
    marginTop: 210,
    left: 0,
    color: 'white',
    fontSize: 24,
    fontFamily: 'MagicalNight',
    alignSelf: 'flex-start',
  },
});
