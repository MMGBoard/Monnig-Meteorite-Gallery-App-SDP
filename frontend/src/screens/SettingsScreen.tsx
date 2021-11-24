import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native';
import { RadioButton, Button as PaperButton, Text as TextPaper, Divider as PaperDivider } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import Slider from '@react-native-community/slider';

export default function SettingsScreen({navigation} : {navigation: any}) {
    const languages = ["English", "Spanish", "French"]
    const visiontype = ["Blurred Vision", "Type 1", "Type 2", "Type 3"]
    const [brightnessValue, setbrightnessValue] = useState(15);
    const [fontSizeValue, setfontSizeValue] = useState(15);
    const [value, setValue] = React.useState('first');
    return (
      <>
        <View style={styles.topcontainer}>
          <TextPaper style={styles.toplabel}>Language Preference:</TextPaper>
          <SelectDropdown
              data={languages}
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
          <TextPaper style={styles.label}>    Brightness:</TextPaper>
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
          <TextPaper style={styles.label}>{brightnessValue}%</TextPaper>
        </View>
        <PaperDivider/>
        <View style={styles.container}>
          <TextPaper style={styles.label}>Font Size:</TextPaper>
          <Slider
            style={{width: 300, marginLeft: "30%",marginBottom: 20}}
            maximumValue={100}
            minimumValue={0}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={fontSizeValue}
            onValueChange={
              (sliderValue) => setfontSizeValue(sliderValue)
            }
          />
          <TextPaper style={styles.label}>{fontSizeValue}</TextPaper>
        </View>
        <PaperDivider/>
        <TextPaper style={styles.midlabel}>Color Blindness Type:</TextPaper>
        <View style={styles.radioContainer}>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Deuteranomaly" value="firstChoice" />
             <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Protanomaly" value="secondChoice" />   
              <RadioButton.Item labelStyle={{fontSize: 18, textAlign: 'center', fontFamily: 'ROBOTO'}}
                color="#4D1979" label="Protanopia" value="thirdChoice" />
          </RadioButton.Group>
          <PaperDivider/>
          <View style={styles.container}>
            <TextPaper style={styles.label}>Visual Impairment Type:</TextPaper>
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
              <TextPaper style={{color: "white"}}>Reset Settings</TextPaper>
          </PaperButton>
        </View>
        <TextPaper style={styles.label}>{'\u00A9'} MMG App</TextPaper>
      </>
    );
}

const styles = StyleSheet.create({
  topcontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: "30%"
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