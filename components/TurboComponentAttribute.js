import React from 'react';
import {Spring, config} from 'react-spring/renderprops.cjs';

function TurboComponentAttribute({imgUrl, altTag, subtitle, attributeNumber, title, playAnimation, delay = 0, fontSize = 'large'}) {
  let decimalsNeeded  = getDecimalsNeeded(attributeNumber);
  return (
    <li>
      { imgUrl &&
        <img
          src={imgUrl}
          alt={altTag}
          className={`turbo-component__attribute-icon--font-${fontSize}`}/>
      }
      <div>
        <div className={`turbo-component__attribute turbo-component__attribute--font-${fontSize}`}>
          { subtitle && <h5>{subtitle}</h5> }
          <div>
            {playAnimation &&
              <Spring
                from={{ x: 0 }}
                to={{ x:  attributeNumber }}
                config={{tension: 1250, friction: 50}}
                delay={delay}>
                {props => <span><i>{props.x.toFixed(decimalsNeeded).toString()}</i></span>}
              </Spring>
            }
            {!playAnimation && attributeNumber &&
              <span><i>0</i></span>
            }
            { title && <span><i>{title}</i></span> }
          </div>
        </div>
      </div>
    </li>
  );
}

// Helper Functions

function getDecimalsNeeded(number) {
  let splitByDecimal = Number(number).toString().split('.');
  let hasDecimalValues = splitByDecimal.length > 1;
  if (!hasDecimalValues) { return 0; }
  return splitByDecimal[1].length;
}

export default TurboComponentAttribute;