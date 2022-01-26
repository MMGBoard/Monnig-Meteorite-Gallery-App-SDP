import React, { Component, useEffect, useState } from 'react' ;
import { Text, View, Button, StyleSheet, Alert} from 'react-native' ;
import { RadioButton } from 'react-native-paper' ;
import  TranslateText  from '../components/TranslateText' ;
import { ThemeContext } from '../components/ThemeContextProvider';
import { SettingsContext } from '../components/SettingsContext';

//const currentLang = React.useContext(SettingContext);
const currentLang = 'en'

export async function translateRequest(value:string, target: string){
    let fromLang = 'en';        // source lsang to translate from ( default is English )
    let toLang = target;        // target lang to translate to
    let text = value;           // string to translate to toLang

    const API_KEY = 'AIzaSyAdZc_5KMyqTZDjxndb6w61gBmREomVT2o';                           // API key generated by GCP https://console.cloud.google.com/apis/credentials?project=sdp-mmg
    
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`; // Build url string to send GET Request to GCP
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    
    console.log('')
    console.log('')
    console.log ('GET Request url is ' , url);              // Log the GET Request url

    try {                                                   // Try to fetch GET Request from Google Translat, then return the translated string to the callee
        const response = await fetch(url, {                         
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
        const parsed = await response.json();               // Parse the response to a JSON and await the response
        return parsed.data.translations[0].translatedText;  // Return the translated string
    } catch (error) {
        // Error fetching translation or parsing the response
        console.error("Error Translating Text: Validate GET Request url and parsed response are correct.")
    }
};

export function handleLangChange(checked:any,setChecked:any){
    return (changeLangAlert(checked,setChecked),setChecked(currentLang))
}

// This is a functional component that render's an alert when the user selects a language
const changeLangAlert = (checked:any,setChecked:any) =>
{
    Alert.alert(
        "Warning!",
        "You are about to translate your preferred language to "+checked,
        [
            { text: "Cancel", style: "cancel"},
            { text: "OK", onPress: () => setChecked(checked)}
        ]
    )
}

export default function LanguageSelectionScreen(this: any, {navigation} : {navigation: any}) {
    const image = { uri: "https://wallpaperaccess.com/full/1954699.jpg" };
    let [_checked, setChecked] = React.useState('en');
    const { currentLang, changeLangToEn, changeLangToEs, changeLangToFr } = React.useContext(SettingsContext);

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>
                <TranslateText text="Welcome to TCU's Monnig Meteorite Gallery!" lang={currentLang}/>
            </Text>
            
            <Text style={styles.header}> 
                <TranslateText text="Please select your language preference" lang="en"/>
            </Text>

                <View style={{alignSelf: 'center', width: "35%"}}>
                    <RadioButton.Group  onValueChange={_checked => handleLangChange(_checked,setChecked)} value={_checked}>
                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', width: "50%"}}
                        color="#4D1979" label="English" value="en" />

                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO'}}
                        color="#4D1979" label="Spanish" value="es" />
                        
                        <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO'}}
                        color="#4D1979" label="French" value="fr" />
                    </RadioButton.Group>
                </View>
            <View style={styles.continueButton}>
                <Button title="Continue" color="#4D1979" onPress={() => changeLangToFr()}></Button>
                <Button title="Continue" color="#4D1979" onPress={() => console.log("CLang: " + currentLang)}></Button>
                <Button title="Continue" color="#4D1979" onPress={() => navigation.navigate('AcuityScreen')}></Button>
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
