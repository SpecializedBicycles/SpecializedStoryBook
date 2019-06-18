import React, { Component } from 'react';
import {ThemeContext, themes} from './ThemeContext';
import VideoModalButton from './VideoModalButton';

function ButtonSet({
    button1Url,
    button1Name,
    button1Target,
    button1Type = 'LINK',
    button1Color,
    button1BackgroundColor,
    button1BorderColor,
    button2Url,
    button2Name,
    button2Target,
    button2Type = 'LINK',
    button2Color,
    button2BackgroundColor,
    button2BorderColor,
    theme
  }) {

  const buttonTheme = theme.button;

  const primaryButtonStyles = {
    color: (typeof button1Color === 'string' ? button1Color : buttonTheme.primaryColor),
    background: (typeof button1BackgroundColor === 'string' ? button1BackgroundColor: buttonTheme.primaryBackgroundColor),
    borderColor: (typeof button1BorderColor === 'string' ? button1BorderColor : buttonTheme.primaryBackgroundColor)
  };

  const secondaryButtonStyles = {
    color: (typeof button2Color === 'string' ? button2Color : buttonTheme.secondaryColor),
    background: (typeof button2BackgroundColor === 'string' ? button2BackgroundColor: buttonTheme.secondaryColor),
    borderColor: (typeof button2BorderColor === 'string' ? button2BorderColor : buttonTheme.primaryBackgroundColor)
  };

  return (
    <div className='buttons-set'>
      { /* FIRST BUTTON */ }
      {button1Url && button1Type === 'LINK' &&
        <div>
          <a className='btn btn-primary' style={primaryButtonStyles} href={button1Url} target={button1Target}>{button1Name}</a>
        </div>
      }
      {button1Url && button1Type === 'VIDEO' &&
        <VideoModalButton className='btn btn-primary' style={primaryButtonStyles} href={button1Url} linkName={button1Name} target={button1Target} />
      }

      { /* SECOND BUTTON */ }
      {button2Url && button2Type === 'LINK' &&
        <div><a className='btn btn-primary' style={secondaryButtonStyles} href={button2Url} target={button2Target}>{button2Name}</a></div>
      }
      {button2Url && button2Type === 'VIDEO' &&
        <VideoModalButton className='btn btn-primary' style={secondaryButtonStyles} href={button2Url} linkName={button2Name} target={button2Target} />
      }

    </div>
  );
}

export default ButtonSet;
