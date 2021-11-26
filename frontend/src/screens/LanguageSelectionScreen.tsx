import React from 'react'
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper'

export default function LanguageSelectionScreen({navigation} : {navigation: any}) {
    const image = { uri: "https://wallpaperaccess.com/full/1954699.jpg" };
    const [checked, setChecked] = React.useState('firstlanguage');

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.greeting}> Welcome to TCU's Monnig Meteorite Gallery!</Text>
                <Text style={styles.header}> Please select your language preference</Text>

                    <View style={{alignSelf: 'center', width: "35%"}}>
                        <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', color: 'white', width: "50%"}}
                            color="#4D1979" uncheckedColor="white" label="English" value="firstlanguage" />

                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', color: 'white'}}
                            color="#4D1979" uncheckedColor="white" label="Spanish" value="secondlanguage" />
                            
                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', color: 'white'}}
                            color="#4D1979" uncheckedColor="white" label="French" value="thirdlanguage" />
                        </RadioButton.Group>
                    </View>

                <View style={styles.continueButton}>
                    <Button title="Continue" color="#4D1979" onPress={() => navigation.navigate('AcuityScreen')}></Button>
                    {console.log(checked)}
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: "white",
        textAlign: "center",
        height: "20%",
        fontSize: 38,
        paddingTop: "10%",
        fontFamily: "Rationale"
    },
    header: {
        color: "white",
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