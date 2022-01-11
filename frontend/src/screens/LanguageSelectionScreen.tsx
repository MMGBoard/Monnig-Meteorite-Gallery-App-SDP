import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper'

var translatedResult = new Array();

export function translateRequest(value:string, target: string){
    let fromLang = 'en' ; // You can also write in a string format in any language 'en'
    let toLang = target; // Same you can do here. as i getting the values from another component.
    let text = value;

    let transTxt = ""

    const API_KEY = 'AIzaSyAdZc_5KMyqTZDjxndb6w61gBmREomVT2o';
    
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    
    console.log ('url is ' , url);
    return fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log("response from google again: ", response.data.translations[0].translatedText);
        transTxt = response.data.translations[0].translatedText;
        console.log ('data from the response', transTxt)
        translatedResult[0] = transTxt
        console.log("response value: ",response)
        return response;
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
      })
    // console.log("fetch result: ",translatedResult[0])
    // return translatedResult[0]
    
};

export default function LanguageSelectionScreen(this: any, {navigation} : {navigation: any}) {
    const image = { uri: "https://wallpaperaccess.com/full/1954699.jpg" };
    const [checked, setChecked] = React.useState('en');
    let t = null;
    
    translateRequest("hello","fr").then(response => console.log(JSON.stringify(response.data.translations[0].translatedText)))

    return (
        <View style={styles.container}>
                <Text style={styles.greeting}>{}</Text>
                <Text style={styles.header}> Please select your language preference</Text>

                    <View style={{alignSelf: 'center', width: "35%"}}>
                        <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO', width: "50%"}}
                            color="#4D1979" label="English" value="en" />

                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO'}}
                            color="#4D1979" label="Spanish" value="sp" />
                            
                            <RadioButton.Item labelStyle={{fontSize: 32, fontFamily: 'ROBOTO'}}
                            color="#4D1979" label="French" value="fr" />
                        </RadioButton.Group>
                    </View>
                <View style={styles.continueButton}>
                    <Button title="Continue" color="#4D1979" onPress={() => navigation.navigate('AcuityScreen')}></Button>
                    {console.log("checked: ",checked)}
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