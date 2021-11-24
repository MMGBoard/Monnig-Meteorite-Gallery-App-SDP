import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

export default function CatalogScreen() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [meteorites, setMeteorites] = useState<any[]>([]); // Initial empty array of users

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

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={meteorites}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Meteorite ID: {item.CATALOG}</Text>
          <Text>Meteorite Name: {item.METEORITE_}</Text>
        </View>
      )}
    />
  );
}