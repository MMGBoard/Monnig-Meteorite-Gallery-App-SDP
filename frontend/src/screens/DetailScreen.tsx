import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button as PaperButton, Paragraph, List, Colors, Divider as PaperDivider, Surface as PaperSurface, useTheme, Text as PaperText } from 'react-native-paper';

export default function DetailScreen({navigation} : {navigation: any}, {route} : {route: any}) { //Add Params for passing card
    const [flexDirection, setflexDirection] = useState("column");
  

    return (
        <View>
            <View style={styles.backButton}>
                <PaperButton 
                    icon="chevron-left" mode="contained"
                    onPress={() => navigation.goBack()}
                >Back</PaperButton>
            </View>
            <View style={styles.container}>
                <PaperSurface  style={styles.surface}>
                    <Image source={{}}
                    style={{ width: 600, height: 500, marginBottom: 5 }}/>
                    <View style={styles.textContainer}>
                    <PaperDivider/>
                        <PaperText style={styles.label}>Name</PaperText>
                        <PaperText style={styles.year}>Year</PaperText>
                        <PaperText style={styles.description}>Desc</PaperText>
                    </View>
                </PaperSurface>
                <View style={styles.buttonContainer}>
                    <PaperButton 
                        icon="play-circle" mode="contained"
                        //Make button change to pause-circle when pressed
                        //onPress={() => }
                        >Play</PaperButton>
                    <PaperButton 
                        icon="stop-circle" mode="contained"
                        //Make button change to pause when pressed
                        //onPress={() => ()}
                        >Stop</PaperButton>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    backButton: {
        marginTop: 30,
        marginLeft: 30,
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    pauseButton: {
        marginTop: 30,
        marginLeft: 30,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    playButton: {
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50
    },
    buttonContainer: {
        alignContent: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50
    },
    textContainer: {
        marginTop: 10,
        justifyContent: 'flex-start',
        alignText: 'left',
        width: 700
    },
    label: {
        textAlign: "left",
        marginRight: 10,
        fontSize: 24,
        fontFamily: 'ROBOTO',
        fontWeight: 'bold',
        marginBottom: 5
    },
    year: {
        textAlign: "left",
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'ROBOTO',
        fontStyle: 'italic',
        marginBottom: 5
    },
    description: {
        textAlign: "left",
        marginRight: 10,
        fontSize: 20,
        fontFamily: 'ROBOTO',
        marginBottom: 5
    },
    surface: {
        padding: 8,
        height: 800,
        width: 700,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 4,
    }
});