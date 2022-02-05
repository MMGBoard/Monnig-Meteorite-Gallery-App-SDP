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
 import { Provider as PaperProvider, useTheme } from 'react-native-paper';
 import { ThemeContext } from './src/components/ThemeContextProvider';
 import { SettingsContextProvider } from './src/components/SettingsContext';
 import { CustomDefaultTheme, CustomDarkTheme } from './src/styles/theme';
 
 import {
   AcuityScreen,
   ColorBlindnessScreen,
   LanguageSelectionScreen,
   CatalogScreen,
   SettingsScreen,
   AssistanceScreen,
   DetailScreen
 } from './src/screens/';
 const Stack = createNativeStackNavigator();
 const TopTab = createMaterialTopTabNavigator();

 function TabNavigator() {
  const dark = useTheme().dark;
   return (
     <TopTab.Navigator>
       <TopTab.Screen name="Tour Assitance" component={AssistanceScreen} />
       <TopTab.Screen name="Meteorite Catalog" component={CatalogScreen} />
       <TopTab.Screen name="Settings" component={SettingsScreen} />
     </TopTab.Navigator>
   );
 }

 export default function App() {
  const [isDarkTheme, setDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


  const themeContext = React.useMemo(() => ({
    toggleTheme: () => {
      setDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);


   return (
      <PaperProvider theme={theme}>
        <ThemeContext.Provider value={themeContext}>
          <SettingsContextProvider>
            <NavigationContainer theme={theme}>
              <Stack.Navigator
                initialRouteName="LanguageSelection"
                screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
              <Stack.Screen name="AcuityScreen" component={AcuityScreen} />
              <Stack.Screen name="ColorBlindnessScreen" component={ColorBlindnessScreen} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="CatalogScreen" component={CatalogScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SettingsContextProvider>
        </ThemeContext.Provider>  
      </PaperProvider>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
 