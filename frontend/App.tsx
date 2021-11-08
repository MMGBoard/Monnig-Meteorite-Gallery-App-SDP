/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 import { StyleSheet } from 'react-native';
 
 import {
   AcuityScreen,
   ColorBlindnessScreen,
   LanguageSelectionScreen,
   CatalogScreen,
   SettingsScreen,
   AssistanceScreen
 } from './src/screens/';
 
 
 const Stack = createNativeStackNavigator();
 const TopTab = createMaterialTopTabNavigator();

 function TabNavigator() {
   return (
     <TopTab.Navigator>
       <TopTab.Screen name="AssitanceScreen" component={AssistanceScreen} />
       <TopTab.Screen name="CatalogScreen" component={CatalogScreen} />
       <TopTab.Screen name="SettingsScreen" component={SettingsScreen} />
     </TopTab.Navigator>
   );
 }
 
 export default function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator
         initialRouteName="LanguageSelection"
         screenOptions={{
         headerShown: false,
       }}>
         <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
         <Stack.Screen name="AcuityScreen" component={AcuityScreen} />
         <Stack.Screen name="ColorBlindnessScreen" component={ColorBlindnessScreen} />
         <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
 