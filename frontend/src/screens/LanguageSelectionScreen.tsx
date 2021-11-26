import React from 'react'
import { View, StyleSheet } from 'react-native';
import { RadioButton, Button, Text as PaperText } from 'react-native-paper'

export default function LanguageSelectionScreen({navigation} : {navigation: any}) {
    const [value, setValue] = React.useState('english');

    return (
        <View style={styles.container}>
                <PaperText style={styles.greeting}> Welcome to TCU's Monnig Meteorite Gallery!</PaperText>
                <PaperText style={styles.header}> Please select your language preference</PaperText>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

                    <View style={styles.radios} >
                        <RadioButton value="english"/>
                        <PaperText style={styles.text}> English</PaperText>
                    </View>

                    <View style={styles.radios}>
                        <RadioButton value="spanish"/>
                        <PaperText style={styles.text} >Spanish</PaperText>
                    </View>

                    <View style={styles.radios}>
                        <RadioButton value="french" />
                        <PaperText style={styles.text}>  French</PaperText>
                    </View>

                </RadioButton.Group>

                <View style={{ alignItems: 'center'}}>
                    <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('AcuityScreen')}>
                        Continue
                    </Button>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        textAlign: "center",
        height: "20%",
        fontSize: 30,
        paddingTop: 10,
        fontFamily: "Rationale"
    },
    header: {
        textAlign: "center",
        height: "15%",
        fontSize: 25
    },
    text: {
        textAlign: "center",
        fontSize: 25
    },
    button: {
        width: "45%",
        loading: true,
        alignItems: 'center'
    }
});