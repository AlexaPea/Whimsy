//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import { signInUser } from '../services/firebaseAuth';

const LoginScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);
  
  //input state values
      const  [email, setEmail] = useState('');
      const  [password, setPassword] = useState('');
  
  
      const  [loading, setLoading] = useState(false);
  

      //logon function
      const logOn = async () => {
        if(!email || !password){
            //warning alert
            Alert.alert("Try again", "Please fill in your email and password.",[
                {text: 'Try Again', onPress: () => {setLoading(false)}}
              ])
        }else{
            setLoading(true)
            await signInUser(email,password)
          
         
        }
    }

  // return the rendering of views
  return (
    <ImageBackground
    source={require('../assets/bg/login.png')}
    style={styles.backgroundImage}
  >
<ScrollView>

   
      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Hello Again!</Text>
        <Text style={styles.body}>Welcome back, we’ve missed you!</Text>

        <TextInput 
        style={styles.input}
        keyboardType='email-address'
        placeholderTextColor="rgba(255, 255, 255, 0.76)"
        placeholder='Email'
        defaultValue={email}    
        onChangeText={newValue => setEmail(newValue)}
        keyboardAppearance="dark" 
        />

        <TextInput 
        style={styles.input} 
        keyboardType='default'
        placeholderTextColor="rgba(255, 255, 255, 0.76)"
        secureTextEntry={true} //makes entry secure so you can't see it
        placeholder='Password'
        defaultValue={password}    
        onChangeText={newValue => setPassword(newValue)}
        />

{!loading ? (
  <>
        <TouchableOpacity style={globalStyles.button} onPress={logOn}>
          <ImageBackground source={require('../assets/btn/bg.png')} style={globalStyles.btnBackground}>
            <Text style={globalStyles.btnText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>

        
        {/* Btn to navigate to register */}
        <TouchableOpacity style={styles.buttonSecondary}  onPress={() => navigation.navigate('Register')}>
            <Text style={styles.btnTextTertiary}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        
        </>
           ): <ActivityIndicator animating={loading} size={40} /> }
             </>
      ) : null}

 

   
  </ScrollView>
  </ImageBackground>
  )
}

export default LoginScreen

// styling component
const styles = StyleSheet.create({
  ScrollView:{
    height:100
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // or 'stretch' to stretch the image
    alignContent: 'center',
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30
  },
  heading: {
    fontFamily: 'Hensa', 
    fontSize: 52,
    color: 'white',
    width: 350,
    paddingTop: 385,
    paddingLeft: 20,
    lineHeight: 50
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft:20,
    paddingTop: 10,
    paddingBottom: 40,
    // fontFamily: 'Open Sans'
  },
  button: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop:20,
    // paddingLeft:110,
    alignItems: 'center',
  },
  buttonSecondary: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:-0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBackground:{
    resizeMode: 'cover', 
    width: 307,
    height: 69,
    borderRadius: 20,
    padding:10,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'Hensa', 
    fontSize: 28,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:8
  },
  input:{
    width: 325,
    height: 60,
    backgroundColor: 'rgba(230, 232, 230, 0.24)',
    borderWidth: 5,
    borderColor: 'rgba(130, 94, 49, 0.94)',
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom:28,
    marginLeft:0,
    color: 'white'
  },
  btnTextTertiary:{
    color: 'white',
    width: 500,
    textAlign: 'center',
    paddingTop: 15
  }
});