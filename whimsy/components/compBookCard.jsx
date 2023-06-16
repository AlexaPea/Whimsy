import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const LibraryBookCard = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Hensa': require('../assets/fonts/Hensa.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  // get props
  const { data, number } = props;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bookContainer}>
        <Image style={styles.book} source={require('../assets/cards/book.png')} />
        <View style={styles.contentContainer}>
          <View style={styles.bookSymbolCircle}>
            <Image style={styles.bookSymbol} source={require('../assets/cards/symbols/sword.png')} />
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        {fontLoaded && (
          <View style={styles.titleContainer}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        )}
        <Text style={styles.author}>{data.author}</Text>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>{data.prompt}</Text>
        </View>
      </View>
      <View style={styles.heartCircle}>
        <TouchableOpacity onPress={handleLike}>
          {isLiked ? (
            <Image
              style={styles.heartIcon}
              source={require('../assets/heart-icon-filled.png')}
            />
          ) : (
            <Image
              style={styles.heartIcon}
              source={require('../assets/heart-icon-outline.png')}
            />
          )}
        </TouchableOpacity>
      </View>
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
    width: 80,
    marginTop: -7
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
});
