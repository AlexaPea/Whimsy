//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font';
import { registerNewUser } from '../services/firebaseAuth';

const RegisterScreen = ({ navigation }) => {

  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Hensa': require('../assets/fonts/Hensa.ttf'),
    });
    setFontLoaded(true);
  };

  const getRole = (newValue) => {
    // console.log("Registering...");
    const domain = newValue.split('@')[1]; // Extract the domain from the email
    const roleName = domain === 'whimsy.com' ? 'judge' : 'creator'; // Update the role names as needed
    setRole(roleName);
    console.log(role);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = () => {
    console.log("Registering...");
    registerNewUser(username, email, password, role);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    console.log(role);
    getRole(email);
  }, [email]);
  return (
     // <ScrollView>
    <ImageBackground
      source={require('../assets/bg/register.png')}
      style={styles.backgroundImage}
    >
      <ScrollView>
        {fontLoaded ? (
          <>
          <Text style={styles.heading}>Nice to Meet You!</Text>
          <Text style={styles.body}>We can’t wait to see what you create!</Text>

          <TextInput 
          style={styles.input} 
          keyboardType='default'
          placeholderTextColor="rgba(255, 255, 255, 0.76)"
          placeholder='Username'
          defaultValue={username}    
          onChangeText={newValue => setUsername(newValue)}
          />

        <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholderTextColor="rgba(255, 255, 255, 0.76)"
            placeholder='Email'
            defaultValue={email}
            onChangeText={setEmail}
            onBlur={() => getRole(email)}
          />

          <TextInput 
          style={styles.input} 
          keyboardType='default'
          placeholderTextColor="rgba(255, 255, 255, 0.76)"
          secureTextEntry={true}
          placeholder='Password'
          defaultValue={password}    
          onChangeText={newValue => setPassword(newValue)}
          />

          <TouchableOpacity style={styles.button} onPress={registerUser}>
            <ImageBackground source={require('../assets/btn/bg.png')} style={styles.btnBackground}>
              <Text style={styles.btnText}>Sign Up</Text>
            </ImageBackground>
          </TouchableOpacity>

          
          {/* Btn to navigate to login */}
          <TouchableOpacity style={styles.buttonSecondary}  onPress={() => navigation.goBack()}>
              <Text style={styles.btnTextTertiary}>Already have an account? Login</Text>
          </TouchableOpacity>
          
          </>
        ) : null}

  
      </ScrollView>
    </ImageBackground>

   
  )
}

export default RegisterScreen

// styling component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    alignContent: 'center'
  },
  heading: {
    fontFamily: 'Hensa', 
    fontSize: 52,
    color: 'white',
    width: 350,
    textAlign: 'left',
    paddingTop: 255,
    paddingLeft: 40,
    lineHeight: 50
  },
  body: {
    color: 'white',
    width: 350,
    paddingLeft:40,
    paddingTop: 10,
    paddingBottom: 40,
    // fontFamily: 'Open Sans Hebrew'
  },
  button: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop:20,
    paddingLeft:110,
    alignItems: 'center',
  },
  buttonSecondary: {
    width: 307,
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:25,
    paddingLeft:110,
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
    width: 330,
    height: 60,
    backgroundColor: 'rgba(230, 232, 230, 0.24)',
    borderWidth: 5,
    borderColor: 'rgba(130, 94, 49, 0.94)',
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom:28,
    marginLeft:35,
    color: 'white'
  },
  btnTextTertiary:{
    color: 'white',
    width: 500,
    textAlign: 'center',
    paddingTop: 15
  }
});