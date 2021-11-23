import React, { useState, useEffect } from 'react';
import {View, ActivityIndicator, FlatList, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';

export default function CatalogScreen({navigation}: {navigation: any}) {
  // Data Fetching
  const data = firestore()
        .collection('meteorites_plus')
        // Filter results
        .where('CATALOG', '==', 'M8')
        .get().then(querySnapshot => {
            console.log("No of meteorites found in USA: " + querySnapshot.docs.length);
        });
  

  const [loading, setLoading] = useState(true); //Set loading to true on component mount
  const [meteorites, setMeteories] = useState([]); //Initial empty array of users

  if (loading) {
    return <ActivityIndicator />
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('meteories_plus')
      .onSnapshot(querySnapshot => {
        const meteorite = [];

        querySnapshot.forEach(documentSnapshot => {
          meteorite.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });

      //Unsubscribe from events when no longer in use
      return () => subscriber();
  }, []);

  const ListComponent = () => (
    <FlatList
      data={meteorites}
      renderItem={({ item }) => (
       <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
         <Text>Meteorite ID: {item.id}</Text>
         <Text>Meteorite Name: {item.METEORITE_} </Text>
       </View>
      )}
    />
  );  

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  const LeftContent = (props:any) => <Avatar.Icon {...props} icon="folder" />
  const MyComponent = () => (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );


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
      <View>{ListComponent()}</View>
    </View>
  );
}