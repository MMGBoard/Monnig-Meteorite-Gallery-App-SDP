import React, { useState } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';
import { RadioButton, Text as TextPaper } from 'react-native-paper';

export default function AcuityScreen({navigation} : {navigation: any}) {
  const [flexDirection, setflexDirection] = useState("column");
  const [value, setValue] = React.useState('first');
  return (
    <View style={styles.container}>
      <TextPaper style={styles.label}>Please select your prefered font-size:</TextPaper>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <RadioButton.Item labelStyle={{fontSize: 18, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="firstChoice" />
            <RadioButton.Item labelStyle={{fontSize: 24, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="secondChoice" />
            <RadioButton.Item labelStyle={{fontSize: 36, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="thirdChoice" />
            <RadioButton.Item labelStyle={{fontSize: 48, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="fourthChoice" />
        </RadioButton.Group>
      </View>
      <View style={styles.buttons}>
        <View style={styles.backButton}>
          <Button
            title="Back" color="#4D1979"
            onPress={() => navigation.navigate('AcuityScreen')}
          />
       </View>
       <View style={styles.nextButton}>  
          <Button
            title="Next" color="#4D1979"
            onPress={() => navigation.navigate('ColorBlindnessScreen')}
          />
       </View>  
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "left",
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 24,
    fontFamily: 'ROBOTO'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  radioContainer: {
    flex: 1,
    marginTop: 50,
  },
  buttons: {
    flexDirection: "row",
    flex: 1,
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20, 
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom:0
  },
  backButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'flex-start',
    bottom:0
  },
  nextButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'flex-end',
    bottom:0
  },
});