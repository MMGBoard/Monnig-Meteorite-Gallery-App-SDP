import React, { useState } from 'react'
import { View, StyleSheet, Switch } from 'react-native';
import i18n from 'i18n-js' ;
import { en, es, fr } from '../i18n/supportedLanguages' ;
import { RadioButton, Button as PaperButton, Text as PaperText, useTheme, TouchableRipple } from 'react-native-paper';
import { SettingsContext } from '../components/SettingsContext'


/**
 * Displays acuity screen to record user font preference.
 * @param navigation Used for directing to different screen.
 * @returns React Components to render to App.
 */
export default function AcuityScreen({navigation} : {navigation: any}) {

  const [value, setValue] = React.useState('secondChoice');
  const { currentFontSize_, changeFontSizeTo } = React.useContext(SettingsContext);
  
  return (
    <View>
      <View style={styles.backButton}>
        <PaperButton 
          icon="chevron-left" mode="contained"
          onPress={() => navigation.navigate('LanguageSelectionScreen')}
        >{i18n.t('back')}
        </PaperButton>
        </View>
        <View style={styles.container}>
        <View style={styles.radioContainer}>
        <PaperText style={styles.label}>{i18n.t('selectFont')}</PaperText>
          <RadioButton.Item labelStyle={{fontSize: 18, fontFamily: 'ROBOTO'}}
            label={i18n.t('welcomeTCU')} value="firstChoice" status={ value === 'firstChoice' ? 'checked' : 'unchecked'} onPress={() =>
            {
              changeFontSizeTo(18)
              setValue("firstChoice")
            }}/>
          <RadioButton.Item labelStyle={{fontSize: 24, fontFamily: 'ROBOTO'}}
            label={i18n.t('welcomeTCU')} value="secondChoice" status={ value === 'secondChoice' ? 'checked' : 'unchecked'} onPress={() =>
            {
              changeFontSizeTo(24)
              setValue("secondChoice")
            }}/>
          <RadioButton.Item labelStyle={{fontSize: 36, fontFamily: 'ROBOTO'}}
            label={i18n.t('welcomeTCU')} value="thirdChoice" status={ value === 'thirdChoice' ? 'checked' : 'unchecked'} onPress={() =>
            {
              changeFontSizeTo(36)
              setValue("thirdChoice")
            }}/>
          <RadioButton.Item labelStyle={{fontSize: 48, fontFamily: 'ROBOTO'}}
            label={i18n.t('welcomeTCU')} value="fourthChoice" status={ value === 'fourthChoice' ? 'checked' : 'unchecked'} onPress={() =>
            {
              changeFontSizeTo(48)
              setValue("fourthChoice")
            }}/>
        </View></View>
        <View> 
          <View style={styles.nextButton}>  
            <PaperButton mode="contained"
            onPress={() => navigation.navigate('ColorBlindnessScreen')}>{i18n.t('next')}
            </PaperButton>
          </View>
      </View>   
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "left",
    marginRight: 10,
    fontSize: 24,
    fontFamily: 'ROBOTO',
    marginBottom: 30
  },
  backButton: {
    marginTop: 30,
    marginLeft: 30,
    alignSelf: 'flex-start'
  },
  container: {
    justifyContent: 'center',
    marginLeft: 100,
    marginRight: 100,
  },
  radioContainer: {
    marginTop: 100,
  },
  nextButton: {
    width: "35%",
    marginTop: 500,
    alignSelf: 'center',
    bottom:0
  },
});