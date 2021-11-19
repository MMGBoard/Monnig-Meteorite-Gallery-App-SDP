import React, { useState } from 'react'
import { Text, View, Button, StyleSheet, FlatList, Picker  } from 'react-native';
import { RadioButton, Button as PaperButton, Text as TextPaper, Card } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';

const colors = [
  { id: 1, txt: 'Red', isChecked: false },
  { id: 2, txt: 'Green', isChecked: false },
  { id: 3, txt: 'Blue', isChecked: false },
  { id: 4, txt: 'Dark blue', isChecked: false },
];

export default function ColorBlindnessScreen({navigation} : {navigation: any}) {
  const [items, setItems] = useState(colors);

  const handleChange = (id: number) => {
    let temp = items.map((color) => {
      if (id === color.id) {
        return { ...color, isChecked: !color.isChecked };
      }
      return color;
    });
    setItems(temp);
  };

  let selected = items.filter((product) => product.isChecked);

  const renderFlatList = (renderData: readonly any[] | null | undefined) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,

                }}>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#4D1979' }}
                  onCheckColor="#4D1979"
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <Text style={styles.label}>{item.txt}</Text>
              </View>
        )}
      />
    );
    };

    return (
      <View style={styles.container}>
        <View style={styles.backButton}>
          <PaperButton 
            icon="chevron-left" mode="contained" color="#4D1979"
            onPress={() => navigation.navigate('AcuityScreen')}
          ><Text>Back</Text></PaperButton>
        </View>
        <Text style={styles.header}>Select colors you are not able to see:</Text>
        <View style={styles.checkboxContainer}><View>{renderFlatList(items)}</View></View>
        <Text style={styles.header}>Select your color blindness type:</Text>
          <RNPickerSelect 
              placeholder={{ label: "Select your color blindness type", value: null }} 
              onValueChange={(value) => console.log(value)}
              items={[
                  { label: 'Deuteranomaly', value: 'deuteranomaly' },
                  { label: 'Protanomaly', value: 'protanomaly' },
                  { label: 'Protanopia', value: 'protanopia' },
              ]}
          />
        <View style={styles.nextButton}>  
          <Button
            title="Start tour!" color="#4D1979"
            onPress={() => navigation.navigate('TabNavigator')}
          />
       </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    alignSelf: 'flex-start'
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
    flex: 1,
    marginTop: 250,
    marginBottom: 50,
    width: "45%",
    alignSelf: 'center',
    bottom:0
  },
  picker: {
    width: '69%'
  },
});