import React from 'react'
import { View, StyleSheet, Switch } from 'react-native';
import { RadioButton, Button as PaperButton, Text as PaperText, useTheme, TouchableRipple } from 'react-native-paper';
import { SettingContext } from '../components/SettingContextProvider';

export default function AcuityScreen({navigation} : {navigation: any}) {

  const [flexDirection, setflexDirection] = useState("column");
  const [value, setValue] = React.useState('secondChoice');
 
  return (
    <View>
      <View style={styles.backButton}>
        <PaperButton 
          icon="chevron-left" mode="contained"
          onPress={() => navigation.navigate('LanguageSelectionScreen')}
        >Back</PaperButton>
        </View>
        <View style={styles.container}>
        <View style={styles.radioContainer}>
        <PaperText style={styles.label}>Please select your prefered font-size:</PaperText>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <RadioButton.Item labelStyle={{fontSize: 18, fontFamily: 'ROBOTO'}}
                label="Welcome to TCU!" value="firstChoice" />
            <RadioButton.Item labelStyle={{fontSize: 24, fontFamily: 'ROBOTO'}} 
                label="Welcome to TCU!" value="secondChoice" />
            <RadioButton.Item labelStyle={{fontSize: 36, fontFamily: 'ROBOTO'}}
                label="Welcome to TCU!" value="thirdChoice" />
            <RadioButton.Item labelStyle={{fontSize: 48, fontFamily: 'ROBOTO'}}
                label="Welcome to TCU!" value="fourthChoice" />
          </RadioButton.Group>
        </View></View>
        <View> 
          <View style={styles.nextButton}>  
            <PaperButton mode="contained"
            onPress={() => navigation.navigate('ColorBlindnessScreen')}>
            Next</PaperButton>
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