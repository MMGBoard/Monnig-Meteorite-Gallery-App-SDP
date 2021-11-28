import React from 'react'
import {  View, Button, StyleSheet, ImageBackground } from 'react-native';
import { RadioButton, Text as PaperText } from 'react-native-paper'

export default function LanguageSelectionScreen({navigation} : {navigation: any}) {
    const [checked, setChecked] = React.useState('firstlanguage');

    return (
        <View style={styles.container}>
            <PaperText style={styles.greeting}> Welcome to TCU's Monnig Meteorite Gallery!</PaperText>
            <PaperText style={styles.header}> Please select your language preference</PaperText>
                <View style={{alignSelf: 'center', width: "35%"}}>
                    <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', width: "50%"}}
                            label="English" value="firstlanguage" />

                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO',}}
                            label="Spanish" value="secondlanguage" />
                        
                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', }}
                            label="French" value="thirdlanguage" />
                    </RadioButton.Group>
                </View>
            <View style={styles.continueButton}>
                <Button title="Continue" color="#4D1979" onPress={() => navigation.navigate('AcuityScreen')}></Button>
                {console.log(checked)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    radioContainer: {
        flex: 1,
      },
    image: {
        width: "100%",
        flex: 1,
        justifyContent: "center"
    },
    greeting: {
        textAlign: "center",
        height: "20%",
        fontSize: 38,
        paddingTop: "10%",
        fontFamily: "Rationale"
    },
    header: {
        textAlign: "center",
        height: "15%",
        fontSize: 32
    },
    continueButton: {
        flex: 1,
        marginTop: 250,
        marginBottom: 50,
        width: "45%",
        alignSelf: 'center',
        bottom:0
    }
});