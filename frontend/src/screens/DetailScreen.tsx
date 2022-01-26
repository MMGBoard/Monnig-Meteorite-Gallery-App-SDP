import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button as PaperButton, Divider as PaperDivider, Surface as PaperSurface, useTheme, Text as PaperText, IconButton as PaperIconButton } from 'react-native-paper';
import { CustomDefaultTheme } from '../styles/theme';

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
                    style={styles.image}/>
                    <View style={styles.textContainer}>
                    <PaperDivider/>
                        <PaperText style={styles.label}>Name</PaperText>
                        <PaperText style={styles.year}>Year</PaperText>
                        <PaperText style={styles.description}>Desc</PaperText>
                    </View>
                </PaperSurface>
                <View style={styles.buttonContainer}>
                    <PaperIconButton 
                        icon="play-circle" size = {100} color = {CustomDefaultTheme.colors.primary}
                        //Make button change to pause-circle when pressed
                        //onPress={() => }
                        ></PaperIconButton>
                    <PaperIconButton 
                        icon="stop-circle" size={100} color = {CustomDefaultTheme.colors.primary}
                        //Make button change to pause when pressed
                        //onPress={() => ()}
                        >Stop</PaperIconButton>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    backButton: {
        marginTop: 30,
        marginLeft: 30,
        height: '5%',
        alignSelf: 'flex-start'
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
        marginLeft: '10%',
        marginRight: '10%',
        height: '92%'
    },
    buttonContainer: {
        alignContent: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: 10
    },
    textContainer: {
        marginTop: 10,
        height: '35%',
        justifyContent: 'flex-start',
        alignText: 'left',
        width: '100%'
    },
    label: {
        textAlign: "left",
        height: '13%',
        fontSize: 26,
        fontFamily: 'ROBOTO',
        fontWeight: 'bold',
        marginBottom: 5
    },
    year: {
        textAlign: "left",
        height: '10%',
        fontSize: 18,
        fontFamily: 'ROBOTO',
        fontStyle: 'italic',
        marginBottom: 5
    },
    description: {
        textAlign: "left",
        fontSize: 20,
        fontFamily: 'ROBOTO'
    },
    surface: {
        padding: 8,
        height: '85%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 4,
    },
    image: {
        width: '100%',
        height: '65%',
        marginBottom: 5 
    }
});