import React, {useState} from 'react'
import { Text, View, StyleSheet } from 'react-native' ;
import { Switch, useTheme, RadioButton, Button as PaperButton, Text as PaperText, Divider as PaperDivider } from 'react-native-paper' ;
import SelectDropdown from 'react-native-select-dropdown' ;
import Slider from '@react-native-community/slider' ;
import { ThemeContext } from '../components/ThemeContextProvider' ;
import i18n from 'i18n-js' ;
import { SettingsContext } from '../components/SettingsContext' ;

export default function SettingsScreen({navigation} : {navigation: any}) {
    const blindnessTypes = ["Deuteranomaly", "Protanomaly", "Protanopia"]
    const visiontype = ["Blurred Vision", "Type 1", "Type 2", "Type 3"]
    const [brightnessValue, setbrightnessValue] = useState(15);
    const [fontSizeValue, setfontSizeValue] = useState(15);
    const paperTheme = useTheme();
    const {toggleTheme} = React.useContext(ThemeContext);  
    const { currentLang_ } = React.useContext(SettingsContext);
    
    let [value, setValue] = React.useState(currentLang_);

    return (
      <>
        <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-start", paddingTop: "5%"}}>
          <PaperText style={styles.midlabel}>{i18n.t('darkMode')}</PaperText>
          <Switch style={{marginTop: 20}} value={paperTheme.dark} onValueChange={toggleTheme}/>
        </View>

        <PaperDivider/>

        <View style={styles.topcontainer}>
          <PaperText style={styles.toplabel}>{i18n.t('colorbType')}</PaperText>
          <SelectDropdown
              data={blindnessTypes}
              onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
            return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
            return item
            }}
          />
        </View>
        <PaperDivider/>
        <View style={styles.container}>
          <PaperText style={styles.label}>  {i18n.t('brightness')}</PaperText>
          <Slider
            style={{width: 300, marginLeft: "30%",marginBottom: 20}}
            maximumValue={100}
            minimumValue={1}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={brightnessValue}
            onValueChange={
              (sliderValue) => setbrightnessValue(sliderValue)
            }
          />
          <PaperText style={styles.label}>{brightnessValue}%</PaperText>
        </View>
        <PaperDivider/>
        <View style={styles.container}>
          <PaperText style={styles.label}>{i18n.t('fontSize')}  </PaperText>
          <Slider
            style={{width: 300, marginLeft: "30%",marginBottom: 20}}
            maximumValue={30}
            minimumValue={10}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={fontSizeValue}
            onValueChange={
              (sliderValue) => setfontSizeValue(sliderValue)
            }
          />
          <PaperText style={styles.label}>{fontSizeValue}</PaperText>
        </View>
        <PaperDivider/>
        
        
        <PaperDivider/>
        <PaperText style={styles.midlabel}>{i18n.t('langPref')}</PaperText>
        <View style={styles.radioContainer}>
          {/* <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Deuteranomaly" value="en" />
             <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Protanomaly" value="secondChoice" />   
              <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Protanopia" value="thirdChoice" />
          </RadioButton.Group> */}

                    <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                        value={value} color="#4D1979" label="English" status={ value === 'en' ? 'checked' : 'unchecked'} onPress={() => 
                        {
                            i18n.locale = 'en'
                            setValue('en')
                        }}/>
                    <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                        value={value} color="#4D1979" label="Spanish" status={ value === 'es' ? 'checked' : 'unchecked'} onPress={() => 
                        {
                            i18n.locale = 'es'
                            setValue('es')
                        }}/>
                    <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                        value={value} color="#4D1979" label="French" status={ value === 'fr' ? 'checked' : 'unchecked'} onPress={() => 
                        {
                            i18n.locale = 'fr'
                            setValue('fr')
                        }}/>


          <PaperDivider/>
          <View style={styles.container}>
            <PaperText style={styles.label}>{i18n.t('visualimpType')}  </PaperText>
            <SelectDropdown
              data={visiontype}
              onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
            return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
            return item
            }}
          />

        </View>
        <PaperDivider/>
        
        </View>
        <View style={styles.resetButton}>
          <PaperButton 
              mode="contained" color="#DD1223"
              onPress={() => navigation.navigate('LanguageSelectionScreen')}>
              <PaperText style={{color: "white"}}>{i18n.t('resetSettings')}</PaperText>
          </PaperButton>
        </View>
        <PaperText style={styles.label}>{'\u00A9'} MMG App</PaperText>
      </>

    );
}

const styles = StyleSheet.create({
  topcontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: "3%"
  },
  container: {
    width: "100%", 
    flexDirection: "row", 
    justifyContent: 'center',
    marginTop: "3%" 
  },
  bottomcontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center'
  },
  radioContainer: {
    flex: 1,
  },
  toplabel: {
    marginRight: "5%",
    fontSize: 24,
    fontFamily: 'ROBOTO',
    marginBottom: 30
  },
  midlabel: {
    textAlign: "left",
    marginLeft: "10%",
    fontSize: 24,
    fontFamily: 'ROBOTO',
    marginTop: 30,
    marginBottom: 15
  },
  label: {
    textAlign: "center",
    marginRight: 0,
    fontSize: 24,
    fontFamily: 'ROBOTO',
    marginBottom: 30
  },
  resetButton: {
    flex: 1,
    marginTop: "5%",
    marginRight: "8%",
    alignSelf: 'flex-end'
  }
  });