import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { getCurrentUser } from '../services/firebaseAuth';
import { isStoryLiked } from '../services/firebaseDb';
import { getCurrentFeaturedStories } from '../services/firebaseDb';

const LibraryBookCard = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { data, number } = props;
  console.log(data);
  const numberRank = number;
  const user = getCurrentUser();
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Hensa': require('../assets/fonts/Hensa.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
    
  }, []);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
    checkIfFeatured();
  }, []);

  const checkIfLiked = async () => {
    const userId = user.uid; // Replace with the actual user ID
    const storyId = data.id; // Replace with the actual story ID

    try {
      const liked = await isStoryLiked(userId, storyId);
      setIsLiked(liked);
    } catch (error) {
      console.error('Error checking if story is liked:', error);
      // Handle the error
    }
  };

  const checkIfFeatured = async () => {
    const featuredStories = await getCurrentFeaturedStories();
    const hasFeaturedStory = featuredStories.some((story) => story.creator === data.creator);
    setIsFeatured(hasFeaturedStory);
  };

  // Function to get the book symbol based on the genre
  const getBookSymbol = (genre) => {
    switch (genre) {
      case 'Fantasy':
        return require('../assets/cards/symbols/fantasy.png');
      case 'Sci-Fi':
        return require('../assets/cards/symbols/sciFi.png');
      case 'Classic Twist':
        return require('../assets/cards/symbols/classicTwist.png');
      case 'Romance':
        return require('../assets/cards/symbols/romance.png');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bookContainer}>
        <Image style={styles.book} source={require('../assets/cards/book.png')} />
        <View style={styles.contentContainer}>
          <View style={styles.bookSymbolCircle}>
            <Image style={styles.bookSymbol} source={getBookSymbol(data.genre)} />
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        {fontLoaded && (
          <View style={styles.titleContainer}>
            <Text style={styles.number}>{numberRank}.</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        )}
        <View style={styles.authorContainer}>
          {isFeatured && (
            <Image style={styles.authorIcon} source={require('../assets/wizardHat.png')} />
          )}
          <Text style={styles.author}>{data.creator}</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>{data.prompt}</Text>
        </View>
      </View>

      {isLiked && (
        <View style={styles.heartCircle}>
          <TouchableOpacity>
            <View style={styles.heartCircle}>
              <TouchableOpacity>
                <Image
                  style={styles.heartIcon}
                  source={require('../assets/heart-icon-filled.png')}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LibraryBookCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  book: {
    width: 130,
    height: 163,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#FFFFFF',
    fontFamily: 'Hensa',
    fontSize: 40,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    width: 120,
    marginTop: -7,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  author: {
    color: 'white',
    fontWeight: '200',
  },
  promptContainer: {
    backgroundColor: 'rgba(244, 238, 229, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginTop: 10,
  },
  prompt: {
    color: 'white',
    fontWeight: '600',
  },
  bookSymbol: {
    width: 35,
    height: 35,
  },
  bookSymbolCircle: {
    backgroundColor: 'rgba(155, 132, 100, 0.66)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 50,
    position: 'absolute',
    top: -105,
    left: 22,
    zIndex: 1,
  },
  bookContainer: {
    width: 100,
    marginLeft: -20,
  },
  contentContainer: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    marginLeft: 35,
    marginTop: 25,
    width: 200,
  },
  heartIcon: {
    width: 22,
    height: 22,
    padding: 0,
    marginTop: 2,
  },
  heartCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(143, 120, 88, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginLeft: -30,
  },
  authorIcon:{
    width: 10,
    height: 10,
    marginRight: 5
  }
});
