import { React, Component } from 'react';
import { translateRequest } from '../screens/LanguageSelectionScreen';

class TranslateText extends Component {
    state = {
        text: this.props.text,      // Text to translate from google
        lang: this.props.lang       // Target Lang to translate to
    };

    async doTranslate(){
        const translatedString = await translateRequest(this.props.text,this.props.lang)
        console.log("translatedString ->",translatedString)
        this.setState({ text: translatedString})
    }

    async componentDidMount(){
        console.log(this.props.lang)
        if(this.props.lang != 'en'){  // if target lang is 'en' => do not translate and just return string
            await this.doTranslate()
        }
    }

    render(){
        return this.state.text;
    }
}

export default TranslateText;