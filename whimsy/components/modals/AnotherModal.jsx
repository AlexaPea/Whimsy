import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';

const DeleteModal = () => {

    const [fontLoaded, setFontLoaded] = useState(false);

    const loadFonts = async () => {
      await Font.loadAsync({
        'Hensa': require('../../assets/fonts/Hensa.ttf'),
      });
      setFontLoaded(true);
    };
  
    React.useEffect(() => {
      loadFonts();
    }, []);

    
  return (

    <View>
          {fontLoaded ? (
            <>
            <View style={styles.container}>
            <Text style={styles.heading}>Are you sure?</Text>
            <Text style={styles.body}>Once your story is deleted you won’t be able to retrieve it.</Text>
          </View>
          </>
          ) : null}
     </View>
  )
}

export default DeleteModal

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Hensa',
        fontSize: 52,
        color: 'white',
        width: 350,
        paddingTop: 75,
        paddingLeft: 20,
        lineHeight: 50,
      },
      body: {
        color: 'white',
        width: 350,
        paddingLeft: 20,
        paddingTop: 0,
        paddingBottom: 40,
      },
    button: {
        width: 207,
        height: 59,
        borderRadius: 20,
        marginTop:-20,
        paddingTop:0,
      },
      btnBackground:{
        resizeMode: 'contain', 
        width: 257,
        height: 59,
        borderRadius: 20,
        padding:10,
        alignItems: 'center',
      },
      btnText:{
        fontFamily: 'Hensa', 
        fontSize: 22,
        color: 'white',
        width: 350,
        textAlign: 'center',
        alignItems: 'center',
        paddingTop:8
      },
      container:{
        backgroundColor: '#C29753',
        height: 220,
        width: 350,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 20
      },
})