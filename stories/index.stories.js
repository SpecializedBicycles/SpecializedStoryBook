import React from 'react';

import { storiesOf } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { create } from '@storybook/theming';
import { ThemeProvider } from 'styled-components';

import { Button } from '../html';

import WishListItem from '../components/WishListItem';
import wishListItemMocks from '../mocks/wishListItemMocks';

import TurboComponent from '../components/TurboComponent';
import { turboComponentBaseProps, attribute1, attribute2, attribute3} from '../mocks/turboComponentMocks';

import '../static/styles/specialized/styles.css';

const themes = {
  specialized: {
    colors: {
      warning: "#fe7a00",
      good: "green",
      red: 'red'
    },
    button: {
      primaryColor: '#FFF',
      primaryBackgroundColor: '#292929',
      secondaryColor: '#FFF',
      secondaryBackgroundColor: '#414141'
    }    
  }
}

const ThemeDecorator = storyFn => <ThemeProvider theme={themes.specialized}>{storyFn()}</ThemeProvider>;

storiesOf('Button', module)
  .addDecorator(ThemeDecorator)
  .add('as black', () => <Button>buy now</Button>)
  .add('as red  ', () => <Button color="white" background="red">buy now</Button>)


/* WishList */
storiesOf('WishList', module)
  .addDecorator(ThemeDecorator)
  .add('normal', () => <WishListItem productData={wishListItemMocks.productData} msg={wishListItemMocks.msg} theme={themes.specialized} />)


/* Components */
storiesOf('TurboComponent', module)
  .addDecorator(ThemeDecorator)
  .add('dark', () => <TurboComponent
                        {...turboComponentBaseProps}/> )
  .add('light', () => <TurboComponent
                        {...turboComponentBaseProps}
                        textStyle="light" /> )
  .add('with one button', () => <TurboComponent
                        {...turboComponentBaseProps}
                        button1Name="buy now"
                        button1Url="www.google.com"
                        button1Type="LINK" /> )  
  .add('with two buttons', () => <TurboComponent
                        {...turboComponentBaseProps}
                        button1Name="buy now"
                        button1Url="www.google.com"
                        button1Type="LINK" 
                        button2Name="buy now"
                        button2Url="www.google.com"
                        button2Type="LINK" /> )
  .add('with attributes', () => <TurboComponent
                        {...turboComponentBaseProps}
                        attributeFontType="large"
                        {...attribute1}
                        {...attribute2}
                        {...attribute3}
                        /> )
  .add('stacked attributes centered', () => <TurboComponent
                        {...turboComponentBaseProps}
                        attributeFontType='large'
                        attributeStyle='stack'
                        vPositionForAttributes='top'
                        vPositionForTitle='top'
                        {...attribute1}
                        {...attribute2}
                        {...attribute3}
                        /> )  











