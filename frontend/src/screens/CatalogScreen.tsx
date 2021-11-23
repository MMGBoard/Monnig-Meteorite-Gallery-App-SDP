import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';


export default function CatalogScreen({navigation}: {navigation: any}) {
  const data = firestore()
        .collection('meteorites')
        // Filter results
        .where('COUNTRY', '==', 'USA')
        .get().then(querySnapshot => {
            console.log("No of meteorites found in USA: " + querySnapshot.docs.length);
        });
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
      <View>{MyComponent()}</View>
    </View>
  );
}