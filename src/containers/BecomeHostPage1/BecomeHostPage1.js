import React, { Component } from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '..';
import { ExternalLink, NamedLink } from '../../components';

import Dialog from './Dialog.js';

import { FormattedMessage } from '../../util/reactIntl';

import css from './BecomeHostPage1.css';

//import { gsap, TweenMax } from 'gsap/all';
import House from '../../assets/becomeHostPage/houses2.png';
import One from '../../assets/becomeHostPage/One.png';
import Two from '../../assets/becomeHostPage/Two.png';
import Three from '../../assets/becomeHostPage/Three.png';

export class BecomeHostPage1 extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loadingState: true,
      firstToggle: 'second',
    };

    this.handleLink = this.handleLink.bind(this);
  }
  /* 
    componentDidMount() {
      setTimeout(() => {
        if (this.state.loadingState === true) {
          var item1 = document.querySelector('#item1');
          var item2 = document.querySelector('#item2');
          var item3 = document.querySelector('#item3');
  
          setTimeout(() => {
            item1.style.opacity = 1;
  
            TweenMax.staggerFrom(
              item1,
              1.5,
              {
                skewX: '0deg',
                skewY: '0deg',
                opacity: 0,
                y: 60,
                // ease: Power4.easeOut
              },
              0.27
            );
  
            item2.style.opacity = 1;
  
            TweenMax.staggerFrom(
              item2,
              1.5,
              {
                skewX: '0deg',
                skewY: '0deg',
                opacity: 0,
                y: 80,
                // ease: Power4.easeOut
              },
              1.27
            );
  
            item3.style.opacity = 1;
  
            TweenMax.staggerFrom(
              item3,
              1.5,
              {
                skewX: '0deg',
                skewY: '0deg',
                opacity: 0,
                y: 100,
                // ease: Power4.easeOut
              },
              0.27
            );
          }, 10);
        }
      }, 10);
    }
  
    handleLink() {
      window.open('https://calendly.com/socialbnb-onboarding/onboarding', '_blank');
    } */

  render() {
    var isMobile = false; //initiate as false
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }

    const content =
      this.state.loadingState === true ? (
        <div style={{ width: '100vw', overflow: 'hidden' }}>
          <div id="topbar" className={css.topbar} style={{ position: 'fixed', width: '100vw' }}>
            <TopbarContainer />
          </div>

          <div className={css.innerWrapper}>
            <div className={css.HeaderWrapper}></div>

            <div className={this.state.firstToggle === 'second' ? css.items : css.items_hide}>
              <div className={css.item} id="item1">
                <div className={css.iconWrapper}>
                  <img src={One} width="26%" style={{}}></img>
                </div>
                <p className={css.item_Header}>
                  <FormattedMessage id="becomeHost.page2.section1.header" />
                </p>
                <p className={css.item_Subtitle}>
                  <FormattedMessage id="becomeHost.page2.section1.text" />
                </p>
              </div>
              <div className={css.item} id="item2">
                <div className={css.iconWrapper}>
                  <img src={Two} width="25%" style={{}}></img>
                </div>
                <p className={css.item_Header}>
                  <FormattedMessage id="becomeHost.page2.section2.header" />
                </p>
                <p className={css.item_Subtitle}>
                  <FormattedMessage id="becomeHost.page2.section2.text" />
                </p>
              </div>
              <div className={css.item} id="item3">
                <div className={css.iconWrapper}>
                  <img src={Three} width="25%" style={{}}></img>
                </div>
                <p className={css.item_Header}>
                  {' '}
                  <FormattedMessage id="becomeHost.page2.section3.header" />
                </p>
                <p className={css.item_Subtitle}>
                  <FormattedMessage id="becomeHost.page2.section3.text" />
                </p>
              </div>
            </div>
          </div>

          <Dialog></Dialog>
        </div>
      ) : null;

    return (
      <StaticPage
        title="About Us"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'AboutPage',
          description: 'About Saunatime',
          name: 'About page',
        }}
      >
        <div className={css.Wrapper}>{content}</div>
      </StaticPage>
    );
  }
}

export default BecomeHostPage1;
