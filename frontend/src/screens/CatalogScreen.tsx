import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';


export default function CatalogScreen({navigation}: {navigation: any}) {
  const data = firestore()
        .collection('meteorites')
        // Filter results
        .get().then(querySnapshot => {
            console.log("No of meteorites found in USA: " + querySnapshot.docs.length);
        });
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <View style={{}}>
      <Searchbar
        placeholder="Find by meteorite"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={() => <MaterialCommunityIcon name="barcode-scan" size={30} />}
      />
      <RNPickerSelect
        onValueChange={value => console.log(value)}
        items={[
          {label: 'By Display', value: 'by display'},
          {label: 'ALL', value: 'all'},
        ]}
      />
    </View>
  );
}