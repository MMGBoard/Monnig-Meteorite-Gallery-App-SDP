import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, StyleProp, ViewProps, ViewStyle, TextInput } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Button as PaperButton, Card, Paragraph, ActivityIndicator, Searchbar } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../components/ThemeContextProvider' ;
import i18n from 'i18n-js' ;

/**
 * Displays Meteorite Catalog screen to display collection of meteorites from TCU's Meteorite Database.
 * @param navigation Used for directing to different screen.
 * @returns React Components to render to App.
 */
export default function CatalogScreen({navigation} : {navigation: any}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [meteorites, setMeteorites] = useState<any[]>([]); // Initial empty array of users
  const [meteorites_, setMeteorites_] = useState<any[]>([]); // Initial empty array of users
  const [filteredMeteorites, setFilteredMeteorites] = useState<any[]>([]); // Initial empty array of users
  const [searchQuery, setSearchQuery] = React.useState(''); // Initial component state setting 
  const [selectedValue, setSelectedValue] = useState("METEORITE_");
  const [filterSet, SetFilterSet] = useState<any[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query); // Method to setSearchQuery to what is written in bar

  const detailsStack = createNativeStackNavigator();


  // Component to read data from Firestore database and initializes meteors array.
  useEffect(() => {
  //  getCollection();
    const subscriber = firestore()
      .collection('meteorites')
      .onSnapshot(querySnapshot => {
        const meteors: React.SetStateAction<any[]> =  []
        const meteors_: React.SetStateAction<any[]> =  []
        querySnapshot.forEach(documentSnapshot => {
          meteors_.push(documentSnapshot.data());
          meteors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setFilteredMeteorites(meteors_);
        setMeteorites_(meteors_);
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

const searchFilterFunction = (text: string) => {
  // Check if searched text is not blank
  console.log("text: "+ text)
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource

    const newData = meteorites_.filter(
      function (item: any) {
        if(selectedValue == "METEORITE_") {
          const itemData = item.METEORITE_
            ? item.METEORITE_.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          console.log("search:"+ textData);
          return itemData.indexOf(textData) > -1;
        } else if(selectedValue == "CATEGORY") {
          const itemData = item.CATEGORY
            ? item.CATEGORY.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          console.log("search:"+ textData);
          return itemData.indexOf(textData) > -1;
        } else if(selectedValue == "GROUP") {
          const itemData = item.GROUP
            ? item.GROUP.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          console.log("search:"+ textData);
          return itemData.indexOf(textData) > -1;
        } 
    });
    setFilteredMeteorites(newData);
    setSearchText(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredMeteorites(meteorites_);
    setSearchText(text);
  }
};
//const arrayOfValueAs = meteorites.map((stateObj) => stateObj.data["PICTURES"]);

// Render return
  return (
    <View>
      <View style={styles.container}>
        <TextInput
            style={styles.textInputStyleLight}
            //label="Email"
            value={searchText}
            placeholder="Search Here"
            onChangeText={(text) => searchFilterFunction(text)}
          />
        <Picker style={{flex:0.25, justifyContent: 'center', alignContent: 'center', height: 50, width: 50}} selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('name')} value="METEORITE_" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('catalogNo')} value="CATALOG" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('category')} value="CATEGORY" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('class')} value="CLASS" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('year')} value="DATE_FOUND" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('group')} value="GROUP" />
          <Picker.Item style={{fontSize: 20}}label= {i18n.t('location')} value="LOCATION" /> */
        </Picker>
      </View>
     <View>
      <FlatList style={{ marginTop: 15 }}
        data={filteredMeteorites}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, marginVertical: 25,marginHorizontal: 5, backgroundColor: '#ddd', height: 300, borderRadius: 15}}>
            <Card  onPress={() => navigation.navigate('DetailScreen' , item)}>
              <Card.Cover source={{ uri: item.PICTURES}} resizeMode='cover'/>
              <Card.Title title={item.METEORITE_} subtitle={item.CATALOG} />
              <Card.Content>
                <Paragraph>{item.LOCATION}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <PaperButton onPress={() => navigation.navigate('DetailScreen' , item)}>{i18n.t('view')}</PaperButton>
              </Card.Actions>
            </Card>
          </View>
        )} />
      </View>
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
  },
  textInputStyleLight: {
    flex:0.75, justifyContent: 'center', alignContent: 'center', height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  }
});