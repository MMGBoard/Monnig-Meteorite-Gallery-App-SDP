import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button as PaperButton, Text as PaperText, Switch, useTheme, IconButton as PaperIconButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';
import i18n from 'i18n-js' ;
import { ThemeContext } from '../components/ThemeContextProvider';
import { SettingsContext } from '../components/SettingsContext'


export default function ColorBlindnessScreen({navigation} : {navigation: any}) {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(ThemeContext);  
  const { currentLang_ } = React.useContext(SettingsContext);
  let themeString = "";
  let color = "";
  if(!paperTheme.dark) {
    themeString = "Dark Mode"
    color = "#4D1979"
  } else {
    themeString = "Light Mode"
    color = "#FFC107"
  }
    return (
      <View>
        <View style={styles.backButton}>
          <PaperButton 
            icon="chevron-left" mode="contained"
            onPress={() => navigation.navigate('AcuityScreen')}
          >{i18n.t('back')}
          </PaperButton>
        </View>
        <View style={{
            position: 'absolute', 
            top: 0, left: 0, 
            right: 0, bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <PaperText style={styles.themeLabel}>
                {i18n.t('selectTheme')}
            </PaperText>
                      <PaperIconButton 
                        icon="theme-light-dark" size={130} color={color}
                        //Make button change to pause-circle when pressed
                        onPress={toggleTheme}
                        >{themeString}</PaperIconButton>    
          </View>
            <View style={styles.container}>
          <View style={styles.nextButton}>  
            <PaperButton mode="contained"
              onPress={() => navigation.navigate('TabNavigator')}
            >{i18n.t('startTour')}</PaperButton>
        </View>
       </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  backButton: {
    marginTop: 30,
    marginLeft: 30,
    alignSelf: 'flex-start'
  },
  themeLabel: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Rationale"
  },
  themeCard: {
    marginLeft: 300,
    marginRight: 50,
    maxHeight: 500,
    maxWidth: 300,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  header: {
    textAlign: "left",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 22,
    fontFamily: 'ROBOTO',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'ROBOTO'
  },
  nextButton: {
    marginTop: 500,
    marginBottom: 50,
    width: "45%",
    alignSelf: 'center',
    bottom:0
  },
  picker: {
    width: '69%'
  },
});