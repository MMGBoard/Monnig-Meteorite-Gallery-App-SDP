import { React, Component } from 'react';
import { translateRequest } from '../screens/LanguageSelectionScreen';
import equal from 'fast-deep-equal'
import Tts from 'react-native-tts'

class TranslateText extends Component {
    state = {
        text: this.props.text,      // Text to translate from google
        lang: this.props.lang,      // Target Lang to translate to
        status: this.props.status   // TTS status
    };

    test(){
        console.log("Printing test")
        Tts.setDefaultLanguage("en")                   
        Tts.speak(this.props.text)
    }

    async doTranslate(){
        const translatedString = await translateRequest(this.props.text,this.props.lang)
        console.log("translatedString ->",translatedString)
        this.setState({ text: translatedString})
    }

    async componentDidMount(){
        if(this.props.lang != 'en'){  // if target lang is 'en' => do not translate and just return string
            await this.doTranslate()
        }
    }

    async componentDidUpdate(prevProp){
        if(!equal(this.props.lang, prevProp.lang))
        if(this.props.lang != 'en'){  // if target lang is 'en' => do not translate and just return string
            await this.doTranslate()
            // if(this.props.status == "Play"){
            //     //this.test()
            //     console.log("Play callback received")
            // }
            // if(this.props.status == "Stop"){
            //     //this.test()
            //     console.log("Stop callback received")
            // }
            console.log(this.props.status)
        }
    }

    render(){
        return this.state.text;
    }
}
export default TranslateText;