import React from 'react';

// Declaring the state object globally.
const currentLanguageState = {
    currentLang_: 'en',
};
  
const settingsContextWrapper = (component?: React.Component) => ({
    ...currentLanguageState,
    changeLangToEn: () => {
        currentLanguageState.currentLang_ = 'en'
        component?.setState({ context: settingsContextWrapper(component) });
    },
    changeLangToEs: () => {
        currentLanguageState.currentLang_ = 'es'
        component?.setState({ context: settingsContextWrapper(component) });
    },
    changeLangToFr: () => {
        currentLanguageState.currentLang_ = 'fr'
        component?.setState({ context: settingsContextWrapper(component) });
    },
});
  
type Context = ReturnType<typeof settingsContextWrapper>;
  
export const SettingsContext = React.createContext<Context>(settingsContextWrapper());
  
interface State {
    context: Context;
}
  
export class SettingsContextProvider extends React.Component {
    state: State = {
      context: settingsContextWrapper(this),
    };
  
    render() {
      return (
        <SettingsContext.Provider value={this.state.context}>
          {this.props.children}
        </SettingsContext.Provider>
      );
    }
}