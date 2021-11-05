import React from 'react'
import { Text, View, Button } from 'react-native';

export default function ColorBlindnessScreen({navigation} : {navigation: any}) {
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