import React from 'react'
import { Text, View } from 'react-native';
import { Switch, useTheme, Text as PaperText } from 'react-native-paper';
import { SettingContext } from '../components/SettingContextProvider';

export default function SettingsScreen({navigation} : {navigation: any}) {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(SettingContext);  
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PaperText>Dark Mode</PaperText><View><Switch value={paperTheme.dark}
        onValueChange={toggleTheme}
        /></View>
        <Text>Settings!</Text>
      </View>
    );
}