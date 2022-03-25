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

    async doTranslate(){
        console.log("translation start")
        const translatedString = await translateRequest(this.props.text,this.props.lang)
        console.log("translatedString ->",translatedString)
        this.setState({ text: translatedString}, ()=>{console.log("text3: " + translatedString);})
        if(this.props.status=="Play"){
            Tts.setDefaultLanguage(this.props.lang)
            Tts.speak(translatedString)
        }else{
            Tts.stop()
        }
    }

    async componentDidMount(){
        if(this.props.lang != 'en'){  // if target lang is 'en' => do not translate and just return string
            await this.doTranslate()
        }
    }

    async componentDidUpdate(prevProp){
        if(!equal(this.props.lang, prevProp.lang)||!equal(this.props.status, prevProp.status))
        if(this.props.lang != 'en'){  // if target lang is 'en' => do not translate and just return string
            await this.doTranslate()
        }else{
            if(this.props.status=="Play"){
                Tts.setDefaultLanguage(this.props.lang)
                Tts.speak(this.props.text)
            }else{
                Tts.stop()
            }
        }
    }

    render(){
        return this.state.text;
    }
}
export default TranslateText;