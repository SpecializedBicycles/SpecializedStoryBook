import React from 'react';

export const themes = {
  specialized: {
    button: {
      primaryColor: 'FFF',
      primaryBackgroundColor: '292929',
      secondaryColor: 'FFF',
      secondaryBackgroundColor: '414141'
    }
  }
};

export const ThemeContext = React.createContext({
  theme: themes.specialized
});