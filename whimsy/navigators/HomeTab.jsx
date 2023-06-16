import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from '../screens/LibraryScreen';
import HomeScreen from '../screens/HomeScreen';
import CompScreen from '../screens/CompScreen';
import WriteScreenOne from '../screens/write/WriteScreenOne';
import * as Font from 'expo-font';
import OwnStoryScreen from '../screens/OwnStoryScreen';

const HomeTab = () => {
  const Tab = createBottomTabNavigator();

  const CustomTabBarIcon = ({ icon, focused }) => (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <Image
        source={icon}
        style={styles.icon}
      />
    </View>
  );

  return (
    <Tab.Navigator 
      style={styles.tabNavigator}
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: styles.tabBar, 
        showLabel: false,
      }}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/home.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/library.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Comp"
        component={CompScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/comp.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Write"
        component={OwnStoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/write.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#887654',
    borderTopWidth: 0,
    height: 82, 
    width: 350, 
    borderRadius: 20,
    bottom: 20,
    left: 29
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#6B8DFF',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  }
});

export default HomeTab;
