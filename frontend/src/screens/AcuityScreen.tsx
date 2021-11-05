import React from 'react'
import { Text, View, Button } from 'react-native';

export default function AcuityScreen({navigation} : {navigation: any}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
        title="Go to ColorBlindness Check!"
        onPress={() => navigation.navigate('ColorBlindnessScreen')}
      />
      </View>
    );
}