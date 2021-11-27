import React from 'react'
import { Text, View, Image } from 'react-native';

export default function AssistanceScreen({navigation} : {navigation: any}) {
  let imagePath = require("../../images/TourAssistanceScreenshot.png");

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={imagePath} resizeMode="cover" style={{width: "101%", height: "102%"}} />
      </View>
    );
}