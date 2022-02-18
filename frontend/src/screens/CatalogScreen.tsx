import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button, Card, Paragraph, ActivityIndicator, Searchbar, List, Colors } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js' ;


export default function CatalogScreen({navigation} : {navigation: any}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [meteorites, setMeteorites] = useState<any[]>([]); // Initial empty array of users
  const [searchQuery, setSearchQuery] = React.useState(''); // Initial component state setting 
  const [selectedValue, setSelectedValue] = useState("METEORITE_");
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query); // Method to setSearchQuery to what is written in bar

  const detailsStack = createNativeStackNavigator();


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
    return (
    <View style={styles.activityLoaderContainer}>
      <ActivityIndicator size="large"/>
    </View>);
  }

const onSubmitted = () => {
  if (searchQuery != ""){
    console.log("Search query: ", searchQuery);
    firestore()
    .collection('meteorites')
    .where(selectedValue, 'in', [searchQuery])
    .get()
    .then(querySnapshot => {
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
  }
  if (searchQuery == ""){
    firestore()
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
  }
}

// Render return
  return (
    <View>
      <View style={styles.container}>
        <Picker style={{flex:0.5, justifyContent: 'center', alignContent: 'center', height: 50, flexGrow: 1}} selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('name')} value="METEORITE_" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('catalogNo')} value="CATALOG" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('category')} value="CATEGORY" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('class')} value="CLASS" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('year')} value="DATE_FOUND" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('group')} value="GROUP" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('location')} value="LOCATION" />
        </Picker>
       {/**  <Searchbar style={{flex:0.5, justifyContent: 'center', alignContent: 'center', height: 50, flexGrow: 3}} placeholder={i18n.t('search')} onChangeText={onChangeSearch} value={searchQuery} onSubmitEditing={()=>onSubmitted()}/>*/}
      </View>
     
      <FlatList style={{ margin: 5 }}
        data={meteorites}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, marginVertical: 25,marginHorizontal: 5, backgroundColor: '#ddd', height: 300, borderRadius: 15}}>
            <Card>
              <Card.Cover source={{ uri: item.PICTURES}} resizeMode='cover'/>
              <Card.Title title={item.METEORITE_} subtitle={item.CATALOG} />
              <Card.Content>
                <Paragraph>{item.LOCATION}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => navigation.navigate('DetailScreen' , item)}>{i18n.t('view')}</Button>
              </Card.Actions>
            </Card>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  activityLoaderContainer: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 10,
    flexDirection: 'row'
  }
});