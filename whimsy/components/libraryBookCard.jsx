import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const libraryBookCard = (props) => {
  // get props
  const { data } = props;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
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
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.author}>{data.creator}</Text>
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

export default libraryBookCard;

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
  title: {
    color: 'white',
    fontWeight: '700',
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
    width: 30,
    height: 30,
    overflow: 'visible'
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
    overflow: 'visible'
  },
  bookContainer: {
    width: 100,
    marginLeft: -20
  },
  contentContainer: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    marginLeft: 35,
    marginTop: 35,
    width: 200
  },
  heartIcon: {
    width: 22,
    height: 22,
    padding: 0,
    marginTop: 2
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
  }
});