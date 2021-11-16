import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function CatalogScreen({navigation} : {navigation: any}) {

    const data = firestore()
        .collection('meteorites')
        // Filter results
        .where('COUNTRY', '==', 'USA')
        .get().then(querySnapshot => {
            console.log("No of meteorites found in USA: " + querySnapshot.docs.length);
        });
    
    return (   
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CatalogScreen!</Text>
    </View>
    );
}