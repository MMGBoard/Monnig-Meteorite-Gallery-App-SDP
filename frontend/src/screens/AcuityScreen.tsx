import React, { useState } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';
import { RadioButton, Button as PaperButton, Text as TextPaper } from 'react-native-paper';

export default function AcuityScreen({navigation} : {navigation: any}) {
  const [flexDirection, setflexDirection] = useState("column");
  const [value, setValue] = React.useState('secondChoice');
 
  return (
    <View style={styles.container}>
    <View style={styles.backButton}>
          <PaperButton 
            icon="chevron-left" mode="contained" color="#4D1979"
            onPress={() => navigation.navigate('LanguageSelectionScreen')}
          ><Text>Back</Text></PaperButton>
       </View>
      <TextPaper style={styles.label}>Please select your prefered font-size:</TextPaper>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <RadioButton.Item labelStyle={{fontSize: 18, fontFamily: 'ROBOTO'}}
              color="#4D1979" label="Welcome to TCU!" value="firstChoice" />
            <RadioButton.Item labelStyle={{fontSize: 24, fontFamily: 'ROBOTO'}} 
              color="#4D1979" label="Welcome to TCU!" value="secondChoice" />
            <RadioButton.Item labelStyle={{fontSize: 36, fontFamily: 'ROBOTO'}}
              color="#4D1979" label="Welcome to TCU!" value="thirdChoice" />
            <RadioButton.Item labelStyle={{fontSize: 48, fontFamily: 'ROBOTO'}}
              color="#4D1979" label="Welcome to TCU!" value="fourthChoice" />
        </RadioButton.Group>
      </View>
       <View style={styles.nextButton}>  
          <Button
            title="Next" color="#4D1979"
            onPress={() => navigation.navigate('ColorBlindnessScreen')}
          />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  radioContainer: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  nextButton: {
    flex: 1,
    marginTop: 250,
    marginBottom: 50,
    width: "45%",
    alignSelf: 'center',
    bottom:0
  },
});