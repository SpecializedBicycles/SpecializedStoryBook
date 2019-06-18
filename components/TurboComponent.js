import React, { Component, Fragment } from 'react';
import {Spring, config} from 'react-spring/renderprops.cjs';
import TurboComponentAttribute from './TurboComponentAttribute';
import ResponsiveImage from './ResponsiveImage';
import { Mobile, Default } from './responsiveBreakpoints';
import VideoModalButton from './VideoModalButton';
import ButtonSet from './ButtonSet';
import { Waypoint } from 'react-waypoint';
import AOS from 'aos';
import uuid from 'uuid/v4';
import * as $ from 'jquery';
import {ThemeContext, themes} from './ThemeContext';

class TurboComponent extends Component {

  static defaultCopyHexColor = 'FFF';
  static defaultButtonType = 'link';

  static defaultProps = {
    vPositionForTitle: 'top',
    vPositionForAttributes: 'bottom',
    hPositionForTitle: "left",
    hPositionForAttributes: "right",
    copyAlignment: 'left',
    titleFontType: 'large',
    textStyle: 'light',
    attributeStyle: '',
    button1Type: TurboComponent.defaultButtonType,
    button2Type: TurboComponent.defaultButtonType
  };

  constructor(props) {
    super(props);
    this.state = {
      playCounterAnimation: false,
      imagesLoaded: false
    };
    this.fadeIn = this.fadeIn.bind(this);
    this.calculateSubtitleHeight = this.calculateSubtitleHeight.bind(this);
    this.componentUUID = uuid();
    this.container = React.createRef();
  }

  componentDidMount() {
    // wait for images
    const self = this;
    const {
      mobileImage,
      tabletImage,
      desktopImage,
      attribute1IconUrl,
      attribute2IconUrl,
      attribute3IconUrl } = this.props;

    const checkImageLoaded = (path) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve({path, status: 'ok'});
        img.onerror = () => resolve({path, status: 'fail'});
        img.src = path;
      });
    };

    const imagePromises = [
      mobileImage,
      tabletImage,
      desktopImage,
      attribute1IconUrl,
      attribute2IconUrl,
      attribute3IconUrl,
    ].map(path => {
      return checkImageLoaded(path);
    });

    Promise.all(imagePromises).then(() => {
      this.setState({imagesLoaded: true});
    });

    // attach window resize listener for subtitle height
    window.addEventListener('resize', _.debounce(() => {
      this.calculateSubtitleHeight();
    }, 200).bind(this));

  }

  componentDidUpdate(prevProps, prevState) {
    /* Unwrap to remove the parent with tons of data attributes */
    if (!prevState.imagesLoaded && this.state.imagesLoaded) {
      // $(this.container.current).unwrap();
    }

    this.calculateSubtitleHeight();
  }

  calculateSubtitleHeight() {
    /* Get all attribute list elements */
    let attributeNodeList = document.querySelectorAll('.turbo-component__' + this.componentUUID + ' .turbo-component__attributes li h5' );
    if (attributeNodeList.length) {
      // reset the list
      attributeNodeList.forEach(node => {
        node.style.height = 'auto';
      });

      // find the max height
      let maxHeightNode = attributeNodeList[0];
      attributeNodeList.forEach(node => {
        if (node.offsetHeight > maxHeightNode.offsetHeight) {
          maxHeightNode = node;
        }
      })

      // Set all nodes to max height
      attributeNodeList.forEach(node => {
        node.style.height = maxHeightNode.offsetHeight.toString() + 'px';
      });
    }
  }

  fadeIn() {
    setTimeout(() => {
      this.setState({
        playCounterAnimation: true
      });
    }, 300);
  }

  render() {
    const {
      vPositionForTitle,
      vPositionForAttributes,
      hPositionForTitle,
      hPositionForAttributes,
      mobileImage,
      tabletImage,
      desktopImage,
      textStyle,
      copyAlignment,
      titleHexColor,
      titleFontType,
      title,
      subtitleHexColor,
      subtitle,
      descHexColor,
      descBackgroundHexColor,
      description,
      attributeStyle,
      attributeFontType,
      attributeHexColor,
      attribute1Subtitle,
      attribute2Subtitle,
      attribute3Subtitle,
      attribute1Title,
      attribute2Title,
      attribute3Title,
      attribute1IconUrl,
      attribute2IconUrl,
      attribute3IconUrl,
      attribute1AltTag,
      attribute2AltTag,
      attribute3AltTag,
      attribute1Number,
      attribute2Number,
      attribute3Number,
      button1Url,
      button1Name,
      button1Target,
      button1Type,
      button1Color,
      button1BackgroundColor,
      button1BorderColor,
      button2Url,
      button2Name,
      button2Target,
      button2Type,
      button2Color,
      button2BackgroundColor,
      button2BorderColor
    } = this.props;

    const buttonProps = {
      button1Url,
      button1Name,
      button1Target,
      button1Type,
      button1Color,
      button1BackgroundColor,
      button1BorderColor,
      button2Url,
      button2Name,
      button2Target,
      button2Type,
      button2Color,
      button2BackgroundColor,
      button2BorderColor
    };

    const {
      playCounterAnimation
    } = this.state;

    const activeClass = playCounterAnimation ? 'active' : '';

    // Hex Color Settings
    const styles = {
      title: { color: '#' + titleHexColor},
      subtitle: {
        color: '#' + subtitleHexColor,
        fontSize: (titleFontType !== 'large' && titleFontType !== 'extra-large' ? '1rem' : '0.75rem')
      },
      description: { color: '#' + descHexColor },
      descriptionBackground: { background: '#' + descBackgroundHexColor }
    };

    // Components
    const titleSubtitleBlock = (
      <Fragment>
          <div data-aos='fade-up' data-aos-anchor={`.turbo-component__animation-anchor--${this.componentUUID}`}>
            {subtitle &&
              <h5 style={styles.subtitle}>{subtitle}</h5>
            }
            {title &&
              <h2 style={styles.title} className={`font-${titleFontType}`}>{title}</h2>
            }
          </div>
      </Fragment>
    );

    const pictureBackgroundBlock = (
      <picture>
        <source
          srcSet={mobileImage}
          media="(max-width: 767px)"/>
        <source
          srcSet={tabletImage}
          media="(min-width: 768px) and (max-width: 1439px) and (orientation:landscape)"/>
        <source
          srcSet={tabletImage}
          media="(min-width: 768px) and (orientation:portrait)"/>
        <source
          srcSet={desktopImage}
          media="(min-width: 1440px) and (orientation:landscape)"/>
        <noscript>
          <img src={desktopImage} srcSet={desktopImage} />
        </noscript>
        <img alt={title} />
      </picture>
    );

    const loadingPlaceholder = (
      <div className="turbo-component">
        <div className="turbo-component__content">
          <div className="turbo-component__picture-container" style={{position: 'static'}}>
            {pictureBackgroundBlock}
          </div>
        </div>
      </div>
    );

    // Classes
    const copyAlignmentClass = (copyAlignment ? `turbo-component__copy--align-${copyAlignment}` : "");
    const attributeStyleClass = (attributeStyle ? `turbo-component__attributes--${attributeStyle}` : "");

    // If both the copy and attributes are aligned to the top, and the attributes are stacked, then align the top of each element horizontally with each other.
    const stackAlign = ((vPositionForTitle === 'top' && vPositionForAttributes === 'top' && attributeStyle === 'stack') ? 'turbo-component__content-inner--stack-align': '');

    if (!this.state.imagesLoaded) {
      return loadingPlaceholder;
    }

    return (
      <div style={styles.descriptionBackground} ref={this.container} className={`turbo-component turbo-component__${this.componentUUID}`}>
        <div className={`turbo-component__animation-anchor turbo-component__animation-anchor--${this.componentUUID}`}></div>
        <div className={`turbo-component__content turbo-component__content--text-${textStyle} `}>

          <div className='turbo-component__picture-container'>
            {pictureBackgroundBlock}
          </div>

          <div className={`turbo-component__content-inner ${stackAlign}`}>
            <div className={`turbo-component__attributes turbo-component__attributes--vertical-${vPositionForAttributes} turbo-component__attributes--horizontal-${hPositionForAttributes} turbo-component__attributes--text-${textStyle} ${attributeStyleClass} ${activeClass}`}>
            {/* ATTRIBUTES */}
              <Waypoint onEnter={this.fadeIn}>
                <ul data-aos='fade-up' data-aos-anchor={`.turbo-component__animation-anchor--${this.componentUUID}`}>

                  {attribute1Title &&
                    <TurboComponentAttribute
                      fontSize={attributeFontType}
                      imgUrl={attribute1IconUrl}
                      altTag={attribute1AltTag}
                      title={attribute1Title}
                      subtitle={attribute1Subtitle}
                      playAnimation={playCounterAnimation}
                      attributeNumber={attribute1Number} />
                  }
                  {attribute2Title &&
                    <TurboComponentAttribute
                      fontSize={attributeFontType}
                      imgUrl={attribute2IconUrl}
                      altTag={attribute2AltTag}
                      title={attribute2Title}
                      subtitle={attribute2Subtitle}
                      playAnimation={playCounterAnimation}
                      attributeNumber={attribute2Number} />
                  }
                  {attribute3Title &&
                    <TurboComponentAttribute
                      fontSize={attributeFontType}
                      imgUrl={attribute3IconUrl}
                      altTag={attribute3AltTag}
                      title={attribute3Title}
                      subtitle={attribute3Subtitle}
                      playAnimation={playCounterAnimation}
                      attributeNumber={attribute3Number} />
                  }
                </ul>
              </Waypoint>
            </div>

            <div className={`turbo-component__copy turbo-component__copy--vertical-${vPositionForTitle} turbo-component__copy--horizontal-${hPositionForTitle} ${copyAlignmentClass} turbo-component__copy--font-${titleFontType} headline-desc-cta`} style={styles.descriptionBackground}>
              {/* TITLE AND SUBTITLE */}
                {(title || subtitle) &&
                  <div className={`turbo-component__title-subtitle turbo-component__title-subtitle--text-${textStyle} headline-desc-cta`}>
                    {titleSubtitleBlock}
                  </div>
                }

              {/* DESCRIPTION */}
              {description &&
                <Default>
                  <div className={`turbo-component__description turbo-component__description--text-${textStyle}`}>
                      <p data-aos='fade-up' data-aos-anchor={`.turbo-component__animation-anchor--${this.componentUUID}`} style={styles.description}>{description}</p>
                  </div>
                </Default>
              }

              {/* BUTTONS */}
              {button1Url &&
                <Default>
                  <div data-aos='fade-up' data-aos-anchor={`.turbo-component__animation-anchor--${this.componentUUID}`}>
                    <ThemeContext.Consumer>
                      {({theme}) => (
                        <ButtonSet {...buttonProps} theme={theme} />
                      )}
                    </ThemeContext.Consumer>
                  </div>
                </Default>
              }

            </div>
          </div>
        </div>

        <Mobile>
          <div className={`turbo-component__copy turbo-component__copy--vertical-${vPositionForTitle} turbo-component__copy--horizontal-${hPositionForTitle} ${copyAlignmentClass} turbo-component__copy--font-${titleFontType} headline-desc-cta`} style={styles.descriptionBackground}>

            {/* DESCRIPTION */}
            {description &&
              <div className={`turbo-component__description turbo-component__description--text-${textStyle}`}>
                  <p style={styles.description}>{description}</p>
              </div>
            }

            {/* BUTTONS */}
            {button1Url &&
              <ThemeContext.Consumer>
                {({theme}) => (
                  <ButtonSet {...buttonProps} theme={theme} />
                )}
              </ThemeContext.Consumer>
            }

          </div>
        </Mobile>
      </div>
    );
  }
}

export default TurboComponent;