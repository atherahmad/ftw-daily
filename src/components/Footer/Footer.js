import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink,
  NewsletterForm,
  NewsletterPanel,
} from '..';

import insta from '../../assets/icons/socialmedia/insta.png';
import fb from '../../assets/icons/socialmedia/facebookRound.png';
import linkedIn from '../../assets/icons/socialmedia/linkedIn.png';

import css from './Footer.css';

import Background from '../../assets/Trekking3.jpg';
import cloud1 from '../../assets/clouds/cloud1a.png';

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink, twitterLink, instragramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

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

  const socialmediaWeb =
    isMobile === false ? (
      <div className={css.socialWrapper}>
        <h1 className={css.socialHeader}>
          <FormattedMessage id="socialmedia.headline" />
        </h1>
        <p className={css.socialSub}>
          <FormattedMessage id="socialmedia.subheadline" />
        </p>
        {/* <div className={css.someLinks}>{socialMediaLinks}</div> */}

        <div className={css.socialButtons}>
          <ExternalLink href="https://www.instagram.com/socialbnb/" className={css.link}>
            <img src={insta} className={css.socialmedia}></img>
          </ExternalLink>
          <ExternalLink href="https://www.facebook.com/Socialbnb" className={css.link}>
            <img src={fb} className={css.socialmedia}></img>
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/company/socialbnb/" className={css.link}>
            <img src={linkedIn} className={css.socialmedia}></img>
          </ExternalLink>
        </div>
      </div>
    ) : null;

  const socialmediaMobile =
    isMobile === true ? (
      <div className={css.socialWrapper}>
        <h1 className={css.socialHeader}>
          <FormattedMessage id="socialmedia.headline" />
        </h1>
        <p className={css.socialSub}>
          <FormattedMessage id="socialmedia.subheadline" />
        </p>
        {/* <div className={css.someLinks}>{socialMediaLinks}</div> */}

        <div className={css.socialButtons}>
          <ExternalLink href="https://www.instagram.com/socialbnb/" className={css.link}>
            <img src={insta} className={css.socialmedia}></img>
          </ExternalLink>
          <ExternalLink href="https://www.facebook.com/Socialbnb" className={css.link}>
            <img src={fb} className={css.socialmedia}></img>
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/company/socialbnb/" className={css.link}>
            <img src={linkedIn} className={css.socialmedia}></img>
          </ExternalLink>
        </div>
      </div>
    ) : null;
  return (
    <div className={css.footer}>
      <div className={css.newscardWrapper}>
        <div className={css.cloudsOuter}>
          <img className={css.clouds} src={cloud1}></img>
        </div>

        <div className={css.newsletterWrapper}>
          <h1 className={css.newsletterHeader}>
            <FormattedMessage id="newsletter.headline" />
          </h1>
          <p className={css.newsletterSub}>
            <FormattedMessage id="newsletter.subheadline" />
          </p>
          <NewsletterPanel></NewsletterPanel>
        </div>

        {socialmediaWeb}
      </div>

      {socialmediaMobile}

      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          {/*<div className={css.someLiksMobile}>{socialMediaLinks}</div>*/}
          <div className={css.links}>
            {/* <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <Logo format="desktop" className={css.logo} />
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="landing.headline1" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div> */}
            <div className={css.infoLinks}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <h3 className={css.legalLink}>
                    <FormattedMessage id="Footer.intro" />
                  </h3>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="LandingPage" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.start" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.about" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <h3 className={css.legalLink}>
                    <FormattedMessage id="TopbarDesktop.destinations" />
                  </h3>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: '?bounds=85.051129%2C179.00736739%2C-75.14077719%2C-160.60200761',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="worldwide" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: '?bounds=42.20773073%2C70.98875672%2C-38.53322805%2C-30.25662092',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="africa" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: '?bounds=75.78022072%2C-171.54093176%2C-13.88336829%2C35.90487732',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="asia" />
                  </NamedLink>
                </li>

                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: '?bounds=70.58376206%2C43.23000513%2C35.74947721%2C-28.69256351',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="europe" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search: '?bounds=33.06714048%2C-19.33722285%2C-59.94294912%2C-157.3194169',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="southamerica" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searchesExtra}>
              <ul className={css.list}>
                <h3 className={css.legalLink}>
                  <FormattedMessage id="Footer.info" />
                </h3>
                <li className={css.listItem}>
                  <NamedLink name="FaqPage" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.FAQ" />
                  </NamedLink>
                </li>

                <li className={css.listItem}>
                  <NamedLink name="ContactPage" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.Contact" />
                  </NamedLink>
                </li>

                <li className={css.listItem}>
                  <ExternalLink href="https://cookiesandyou.com" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.Press" />
                  </ExternalLink>
                </li>
                <li className={css.listItem}>
                  <ExternalLink href="https://cookiesandyou.com" className={css.link}>
                    <FormattedMessage id="TopbarDesktop.Blog" />
                  </ExternalLink>
                </li>
              </ul>
            </div>
            <div className={css.extraLinks}>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <h3 className={css.legalLink}>
                      <FormattedMessage id="Footer.legal" />
                    </h3>
                  </li>
                  <li>
                    <NamedLink name="Imprint" className={css.legalLink}>
                      <FormattedMessage id="Footer.imprint" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/**/}
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
