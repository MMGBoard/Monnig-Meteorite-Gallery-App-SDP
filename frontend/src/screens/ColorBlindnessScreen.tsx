import React, { useState } from 'react'
import { Text, View, Button, StyleSheet, FlatList, Image } from 'react-native';
import { RadioButton, Button as PaperButton, Text as PaperText, Card } from 'react-native-paper';
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
  const [value, setValue] = React.useState('first');

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
                <PaperText style={styles.label}>{item.txt}</PaperText>
              </View>
        )}
      />
    );
    };

    return (
      <View>
        <View style={styles.backButton}>
          <PaperButton 
            icon="chevron-left" mode="contained"
            onPress={() => navigation.navigate('AcuityScreen')}
          >Back</PaperButton>
        </View>
        <View style={styles.container}>
          <PaperText style={styles.header}>Select colors you are not able to see:</PaperText>
          <View style={styles.checkboxContainer}><View>{renderFlatList(items)}</View></View>
          <PaperText style={styles.header}>Select your color blindness type:</PaperText>
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
            <PaperButton mode="contained"
              onPress={() => navigation.navigate('TabNavigator')}
            >Start tour!</PaperButton>
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