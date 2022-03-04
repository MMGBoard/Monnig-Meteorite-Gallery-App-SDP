import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Image, StyleSheet,
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button as PaperButton, Card, Paragraph, ActivityIndicator, Searchbar, List, Colors } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AssistanceScreen({navigation} : {navigation: any}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [meteorites, setMeteorites] = useState<any[]>([]); // Initial empty array of users

  const [searchQuery, setSearchQuery] = React.useState(''); // Initial component state setting 
  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query); // Method to setSearchQuery to what is written in bar

  const detailsStack = createNativeStackNavigator();
  let imagePath = require("../../images/TourAssistanceScreenshotCropped.png");
  
  useEffect(() => {
    //lookForBeacons()
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


const displayUpdate = (displayName: string) => {
  setLoading(true);
  firestore()
  .collection('meteorites')
  .where('DISPLAY_NAME', 'in', [displayName])
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
  
  return (
    <View style={styles.mainContainer}>
      <Image source={imagePath} resizeMode="cover" style={{width: "101%", height: "42%"}} />
      <View style={styles.testButtons}>
      <PaperButton mode="contained" onPress={() => navigation.navigate('BleTest')}>
       Display 1</PaperButton>
      <PaperButton mode="contained" onPress={() => displayUpdate('Texas')}>
       Display 2</PaperButton>
      <PaperButton mode="contained" onPress={() => displayUpdate('Mexico')}>
       Display 3</PaperButton>
       <PaperButton mode="contained" onPress={() => displayUpdate('test4')}>
       Display 4</PaperButton>
       
      </View>
      { loading &&
        <View style={styles.activityLoaderContainer}>
          <ActivityIndicator size="large"/>
        </View>
      } 

      { !loading &&
      <FlatList style={{ margin: 5 }}
        data={meteorites}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, marginVertical: 25,marginHorizontal: 5, backgroundColor: '#ddd', height: 300, borderRadius: 15}}>
            <Card>
              <Card.Cover source={{ uri: item.PICTURES}} resizeMode='cover'/>
              <Card.Title title={item.METEORITE_} subtitle={item.CATALOG} />
              <Card.Content>
                <Paragraph>{item.LOCATION}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <PaperButton onPress={() => navigation.navigate('DetailScreen' , item)}>View</PaperButton>
              </Card.Actions>
            </Card>
          </View>
        )} />
      }
                <View style={styles.buttonContainer}>
                    <PaperButton 
                        icon="play-circle" mode="contained"
                        //Make button change to pause-circle when pressed
                        //onPress={() => }
                        >Play</PaperButton>
                    <PaperButton 
                        icon="stop-circle" mode="contained"
                        //Make button change to pause when pressed
                        //onPress={() => ()}
                        >Stop</PaperButton>
                </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 5,
  },
  activityLoaderContainer: {
    flex: 1,
    justifyContent: "center"
  },
  testButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pauseButton: {
      marginTop: 30,
      marginLeft: 30,
      alignSelf: 'flex-start',
      justifyContent: 'center'
  },
  playButton: {
      alignSelf: 'flex-start',
      justifyContent: 'center'
  },
  buttonContainer: {
      alignContent: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 100,
      marginRight: 100,
      marginTop: 50
  },
});
