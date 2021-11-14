import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';

export default function CatalogScreen({navigation} : {navigation: any}) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CBCheck!</Text>
        <Button
        title="Start Tour!"
        onPress={() => navigation.navigate('TabNavigator')}
      />
    </View>
    );
}