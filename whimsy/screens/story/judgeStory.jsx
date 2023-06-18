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
import { addStoryToBookmarkCollection, addStoryToFeaturedCollection, removeStoryFromBookmarkCollection, removeStoryFromFeaturedCollection,  isStoryBookmarked, updateVotes, addLikesToCollection, removeLikesFromCollection, isStoryLiked, isStoryFeatured   } from '../../services/firebaseDb';



const CustomTextInput = React.forwardRef(({ style, ...props }, ref) => {
  return <TextInput ref={ref} style={style} {...props} />;
});

const JudgeStory = ({ navigation, route }) => {
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
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [votes, setVotes] = useState(story.votes);


  const user = getCurrentUser();
  const userUid = user.uid;

  // const isItBookmarked = isBookmarked(user.uid, route.params.story.id);
  // console.log("working:" + isItBookmarked);



  const loadFonts = async () => {
    await Font.loadAsync({
      Hensa: require('../../assets/fonts/Hensa.ttf'),
      MagicalNight: require('../../assets/fonts/MagicalNight.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      // Retrieve the bookmark status for the current user and update the state
      const isBookmarked = await isStoryBookmarked(user.uid, route.params.story.id);
      setBookmarked(isBookmarked);

      // Retrieve the liked status for the current user and update the state
      const isLiked = await isStoryLiked(user.uid, route.params.story.id);
      setLiked(isLiked);

      loadFonts();
    };
  
    // Call the async function
    fetchData();
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

  const bookmarkStory = async (storyId) => {
    const isBookmarked = await isStoryBookmarked(user.uid, route.params.story.id);
  
    if (isBookmarked) {
      // Story is already bookmarked, so remove it from the bookmarked collection in the database
      removeStoryFromBookmarkCollection(user.uid, route.params.story.id)
        .then(() => {
          console.log('Story removed from bookmarks successfully');
          setBookmarked(false); // Update the bookmarked state to false
        })
        .catch((error) => {
          console.log('Something went wrong: ' + error);
        });
    } else {
      // Story is not bookmarked, so add it to the bookmarked collection in the database
      addStoryToBookmarkCollection(route.params.story.id, userUid)
        .then(() => {
          console.log('Story bookmarked successfully');
          setBookmarked(true); // Update the bookmarked state to true
        })
        .catch((error) => {
          console.log('Something went wrong: ' + error);
        });
    }
  };

  const addFeature = async (storyId) => {
    const isFeatured= await isStoryFeatured(user.uid, route.params.story.id);
  
    if (isFeatured) {
      // Story is already bookmarked, so remove it from the bookmarked collection in the database
      removeStoryFromFeaturedCollection(user.uid, route.params.story.id)
        .then(() => {
          console.log('Story removed from featured successfully');
          setFeatured(false); // Update the bookmarked state to false
        })
        .catch((error) => {
          console.log('Something went wrong: ' + error);
        });
    } else {
      // Story is not bookmarked, so add it to the bookmarked collection in the database
      addStoryToFeaturedCollection(route.params.story.id, userUid)
        .then(() => {
          console.log('Story featured successfully');
          setFeatured(true); // Update the bookmarked state to true
        })
        .catch((error) => {
          console.log('Something went wrong: ' + error);
        });
    }
  };
  

  const likeStory = async () => {
    console.log(votes);
    try {
      if (liked) {
        // If the story is already liked, remove the vote
        const votesNow = votes - 1;
        console.log(votesNow);
        await updateVotes(route.params.story.id, votesNow);
        setLiked(false);
        setVotes(votes - 1);
        removeLikesFromCollection(route.params.story.id, user.uid); // Call the removeLikesFromCollection function
      } else {
        // If the story is not liked, add a vote
        addLikesToCollection(route.params.story.id, user.uid); // Call the addLikesToCollection function
        const votesNow = votes + 1;
        console.log(votesNow);
        await updateVotes(route.params.story.id, votesNow);
        setLiked(true);
        setVotes(votes + 1);
      }
    } catch (error) {
      console.log("Something went wrong in updating votes: " + error);
      throw error;
    }
  };
  
  

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageBackground source={require('../../assets/bg/page.png')} style={styles.backgroundImage}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Library')}>
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
              <Text  scrollView style={styles.storyBody}>{story.story}</Text>
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
            <TouchableOpacity style={styles.menuIcon} onPress={addFeature}>
              <Image style={styles.menuIconImage} source={featured ? require('../../assets/trophy-icon-filled.png') : require('../../assets/trophy-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={editMode ? styles.menuIconActive : styles.menuIcon} onPress={bookmarkStory}>
               <Image style={styles.menuIconImage} source={bookmarked ? require('../../assets/save-icon-filled.png') : require('../../assets/save-icon.png')} />  
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuIcon} onPress={likeStory}>
              <Image style={styles.menuIconImage} source={liked ? require('../../assets/heart-icon-filled.png') : require('../../assets/heart-icon2.png')} />
            </TouchableOpacity>

            </View>
          </View>
        </Animated.View>

        {deleteModalVisible && (
        <View style={styles.modalOverlay}>
           <DeleteModal onClose={() => setDeleteModalVisible(false)} storyId={storyId} navigation={navigation} />
        </View>
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default JudgeStory;

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
    top: 5,
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
    flex: 1,
  },
  
});