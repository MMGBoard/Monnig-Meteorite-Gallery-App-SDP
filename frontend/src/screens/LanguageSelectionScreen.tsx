import React from 'react'
import { Text, View, Button } from 'react-native';

export default function LanguageSelectionScreen({navigation} : {navigation: any}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Lang!</Text>
        <Button
          title="Go to Acuity Check!"
          onPress={() => navigation.navigate('AcuityScreen')}
        />
      </View>
    );
}