import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LibraryScreen from './screens/LibraryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import HomeTab from './navigators/HomeTab';
import WriteScreenOne from './screens/write/WriteScreenOne';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import WriteScreenTwo from './screens/write/WriteScreenTwo';
import WriteScreenThree from './screens/write/WriteScreenThree';
import WriteScreenFour from './screens/write/WriteScreenFour';
import WriteScreenFive from './screens/write/WriteScreenFive';
import ReadStory from './screens/story/readStory';
import ReadOwnStory from './screens/story/readOwnStory';
import Cover from './screens/book/cover';
import Contents from './screens/book/cotentsScreen';

//for each nav we have, we need to go create it
const Stack = createNativeStackNavigator();

export default function App() {

  /*TODO: Set up nav*/
  /*TODO: Check if user is logged in*/

  
  const [loggedIn, setLoggedIn] = useState(false)

  //Check if user is logged in
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("checking if logged In...")
      if(user){
        //user is logged in
        setLoggedIn(true)
      } else {
        //user doesn't exist, meaing they are logged out
        setLoggedIn(false)
      }

    })
    return unsubscribe;
    
  }, [])

  return (
    //Root for navigation
    <NavigationContainer style={styles.nav} theme={navigationTheme}>
      <Stack.Navigator  initialRouteName='Splash' screenOptions={{headerShown: false}}>
      {!loggedIn ? (
        //Show these screens when user isn't logged in
            <>
              <Stack.Screen
              name="Splash"
              component={SplashScreen} 
              //  options={{title: 'Sign Up'}}
              />

              <Stack.Screen
              name="Login"
              component={LoginScreen} 
              //  options={{title: 'Sign Up'}}
              />
              <Stack.Screen
              name="Register"
              component={RegisterScreen} />
            </>
          ):(
            //Show these screens when user IS logged in
            <>
              <Stack.Screen 
              name="HomeTab" 
              component={HomeTab}/>
        
            <Stack.Screen 
              name="WriteOne" 
              component={WriteScreenOne}/>

            <Stack.Screen 
              name="WriteTwo" 
              component={WriteScreenTwo}/>
      
            
            <Stack.Screen 
              name="WriteThree" 
              component={WriteScreenThree}/>

            <Stack.Screen 
              name="WriteFour" 
              component={WriteScreenFour}/>

            <Stack.Screen 
              name="WriteFive" 
              component={WriteScreenFive}/>

            <Stack.Screen 
              name="ReadStory" 
              component={ReadStory}/>

            <Stack.Screen 
              name="ReadOwnStory" 
              component={ReadOwnStory}/>

            <Stack.Screen 
              name="Cover" 
              component={Cover}/>

            <Stack.Screen 
              name="Contents" 
              component={Contents}/>


            </>

            

          )}



      </Stack.Navigator>

    </NavigationContainer>
   
  );
}

const navigationTheme = {
  colors: {
    background: "transparent",
  },
  bg:{
    backgroundColor: "transparent"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav:{
    height:0
  }
});
