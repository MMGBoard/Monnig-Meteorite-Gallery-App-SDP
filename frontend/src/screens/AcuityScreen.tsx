import React, { useState } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';
import { RadioButton, Text as TextPaper } from 'react-native-paper';

export default function AcuityScreen({navigation} : {navigation: any}) {
  const [flexDirection, setflexDirection] = useState("column");
  const [value, setValue] = React.useState('first');
  return (
    <View>
      <TextPaper style={styles.label}>Please select your prefered font-size:</TextPaper>
      <View style={styles.container}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <RadioButton.Item labelStyle={{fontSize: 11, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="firstChoice" />
            <RadioButton.Item labelStyle={{fontSize: 14, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="secondChoice" />
            <RadioButton.Item labelStyle={{fontSize: 24, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="thirdChoice" />
            <RadioButton.Item labelStyle={{fontSize: 36, fontFamily: 'ROBOTO'}} label="Welcome to TCU!" value="fourthChoice" />
        </RadioButton.Group>
        </View>
      <View style={styles.buttons}>
      <Button
        title="Back"
        onPress={() => navigation.navigate('AcuityScreen')}
       />  
      <Button
        title="Go to ColorBlindness Check!"
        onPress={() => navigation.navigate('ColorBlindnessScreen')}
       />  
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 36,
    fontFamily: 'ROBOTO'
  },
  container: {
    flexDirection: "column",
    flex: 1,
    marginTop: 50, 
    marginLeft: 20,
    marginRight: 20,

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
});