import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image, ScrollView, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { Button as PaperButton, Paragraph, List, Colors, Divider as PaperDivider, Surface as PaperSurface, useTheme, Text as PaperText, IconButton as PaperIconButton, DefaultTheme} from 'react-native-paper';
import { useRoute } from '@react-navigation/native'
import i18n from 'i18n-js' ;
import TranslateText from '../components/TranslateText'
import Tts from 'react-native-tts'
import { SettingsContext } from '../components/SettingsContext'

/**
 * Displays contents of an individual meteorite and its associated metadata.
 * @param param0 Used for passing card
 * @returns React Components to render to App
 */

export default function DetailScreen({navigation} : {navigation: any}) { //Add Params for passing card
    const [flexDirection, setflexDirection] = useState("column");
    const { currentFontSize_ } = React.useContext(SettingsContext)
    const route = useRoute<any>();
    const text = <TranslateText text={route.params.DESCRIPTION} lang={i18n.locale} />;

    return (
        <View>
            <View style={styles.backButton}>
                <PaperButton 
                    icon="chevron-left" mode="contained"
                    onPress={() => navigation.goBack()}
                >{i18n.t('back')}</PaperButton>
            </View>
            <View style={styles.container}>
                <PaperSurface  style={styles.surface}>
                    <Image source={{uri: route.params.PICTURES}}
                    style={styles.image}/>
                    <View style={styles.textContainer}>
                    <PaperDivider/>
                        <PaperText style={styles.label}>{route.params.METEORITE_}</PaperText>
                        <PaperText style={styles.year}>{route.params.DATE_FOUND}</PaperText>
                        <ScrollView>
                            <PaperText style={{ textAlign: "left", marginRight: 10, fontSize: currentFontSize_, fontFamily: 'ROBOTO', marginBottom: 5 }}><TranslateText text={route.params.DESCRIPTION} lang={i18n.locale} /></PaperText>
                        </ScrollView>
                    </View>
                </PaperSurface>
                <View style={styles.buttonContainer}>
                    <PaperIconButton 
                        icon="play-circle" size = {130}
                        //Make button change to pause-circle when pressed
                        onPress={() => (Tts.speak(route.params.DESCRIPTION))}
                        ></PaperIconButton>
                    <PaperIconButton 
                        icon="stop-circle" size={130}
                        //Make button change to pause when pressed
                        onPress={() => Tts.stop()}
                        ></PaperIconButton>
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
        marginRight: '20%'
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
        marginBottom: 5,
        marginTop: 15,
        marginLeft:15
    },
    year: {
        textAlign: "left",
        height: '10%',
        fontSize: 18,
        fontFamily: 'ROBOTO',
        fontStyle: 'italic',
        marginBottom: 5,
        marginLeft:15
    },
    surface: {
        padding: 8,
        height: '84%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 4,
    },
    image: {
        width: '100%',
        height: '55%',
        resizeMode: 'contain',
        marginBottom: 5 
    },
});

