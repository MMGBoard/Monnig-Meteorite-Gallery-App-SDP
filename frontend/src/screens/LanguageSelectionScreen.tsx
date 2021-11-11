import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

export default function LanguageSelectionScreen({navigation} : {navigation: any}) {
    const image = { uri: "https://wallpaperaccess.com/full/1954699.jpg" };
    const [value, setValue] = React.useState('english');

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.greeting}> Welcome to TCU's Monnig Meteorite Gallery!</Text>
                <Text style={styles.header}> Please select your language preference</Text>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

                    <View style={styles.radios} >
                        <RadioButton value="english" uncheckedColor="white" color="#4D1979"/>
                        <Text style={styles.text}> English</Text>
                    </View>

                    <View style={styles.radios}>
                        <RadioButton value="spanish" uncheckedColor="white" color="#4D1979"/>
                        <Text style={styles.text} >Spanish</Text>
                    </View>

                    <View style={styles.radios}>
                        <RadioButton value="french" uncheckedColor="white" color="#4D1979"/>
                        <Text style={styles.text}>  French</Text>
                    </View>

                </RadioButton.Group>

                <View style={{ alignItems: 'center'}}>
                    <Button style={styles.button} mode="contained" color="#4D1979" onPress={() => navigation.navigate('AcuityScreen')}>
                        Continue
                    </Button>
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
    radios: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        height: "15%"
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
        fontSize: 30,
        paddingTop: 10,
        fontFamily: "Rationale"
    },
    header: {
        color: "white",
        textAlign: "center",
        height: "15%",
        fontSize: 25
    },
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 25
    },
    button: {
        width: "45%",
        loading: true,
        alignItems: 'center'
    }
});