import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button, Card, Paragraph, Searchbar, List, Colors } from 'react-native-paper';

export default function CatalogScreen() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [meteorites, setMeteorites] = useState<any[]>([]); // Initial empty array of users

  const [searchQuery, setSearchQuery] = React.useState(''); // Initial component state setting 
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query); // Method to setSearchQuery to what is written in bar

  // Component to read data from Firestore database and initializes meteors array.
  useEffect(() => {
    const subscriber = firestore()
      .collection('meteorites')
      .onSnapshot(querySnapshot => {
        const meteors: React.SetStateAction<any[]> =  []
  
        querySnapshot.forEach(documentSnapshot => {
          meteors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setMeteorites(meteors);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

// Set screen to loading if still fetching data
  if (loading) {
    return <ActivityIndicator />;
  }

// Render return
  return (
    <View>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      <FlatList style={{ margin: 5 }}
        data={meteorites}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, marginVertical: 25,marginHorizontal: 5, backgroundColor: '#ddd', height: 300 }}>
            <Card>
              <Card.Cover source={{ uri: item.PICTURES}} resizeMode='cover'/>
              <Card.Title title={item.METEORITE_} subtitle={item.CATALOG} />
              <Card.Content>
                <Paragraph>{item.LOCATION}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>View</Button>
              </Card.Actions>
            </Card>
          </View>
        )} />
    </View>
  );
}