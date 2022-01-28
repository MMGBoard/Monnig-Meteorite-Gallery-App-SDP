// SettingContext.js
import React from 'react';
import { makeObservable, action, observable } from 'mobx';

class CurrentLangStore {
    currentLang_ = 'en';

  constructor() {
    makeObservable(this, {
      currentLang_: observable,
      changeLangToEn: action.bound,
      changeLangToEs: action.bound,
      changeLangToFr: action.bound
    })
  }

  changeLangToEn() {
        this.currentLang_ = 'en';
  }

  changeLangToEs() {
        this.currentLang_ = 'es';
  }
  changeLangToFr() {
        this.currentLang_ = 'fr';
        console.log("changeLangToFr: ",this.currentLang_);
    }
}

// Instantiate the current lang store.
const currentLangStore = new CurrentLangStore();
// Create a React Context with the current lang store instance.
export const CurrentLangStoreContext = React.createContext(currentLangStore);
export const useCurrentLangStore = () => React.useContext(CurrentLangStoreContext)