import React, { Component, Fragment } from 'react';
import { Desktop, Tablet, Mobile, Default } from './responsiveBreakpoints';

function ResponsiveImage({mobileImage, tabletImage, desktopImage}) {

  const commonStyles = {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  return (
    <Fragment>
      {desktopImage &&
        <Desktop>
          <div style={{...commonStyles, backgroundImage: `url(${desktopImage})`}} />
        </Desktop>
      }
      {tabletImage &&
        <Tablet>
          <div style={{...commonStyles, backgroundImage: `url(${tabletImage})`}} />
        </Tablet>
      }
      {mobileImage &&
        <Mobile>
          <div style={{...commonStyles, backgroundImage: `url(${mobileImage})`}} />
        </Mobile>
      }
    </Fragment>
  );
}

export default ResponsiveImage;