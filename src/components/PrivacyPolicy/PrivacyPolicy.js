import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';
import { FormattedMessage } from 'react-intl';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      {/* <p className={css.lastUpdated}>Last updated: October 30, 2017</p> */}

      <ol>
        <li>
          <h2><FormattedMessage id="TermsOfServicePage.headline1" /></h2>
          <h2><FormattedMessage id="TermsOfServicePage.headline1-1" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.1" />
          </p>

          <h3><FormattedMessage id="TermsOfServicePage.p1.2" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.3" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.4" />
          </p>
          <h3><FormattedMessage id="TermsOfServicePage.p1.5" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.6" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.7" />
          </p>

          <h3><FormattedMessage id="TermsOfServicePage.p1.8" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.9" />
          </p>
          <h3><FormattedMessage id="TermsOfServicePage.p1.10" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.11" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.12" />
          </p>

          <h3><FormattedMessage id="TermsOfServicePage.p1.13" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.14" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p1.15" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="TermsOfServicePage.headline2" /></h2>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-1" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2.1" />
          </p>

          <p>
            <FormattedMessage id="TermsOfServicePage.p2.2" /><br />
            <FormattedMessage id="TermsOfServicePage.p2.2.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2.3" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2.4" />
          </p>
          <p><FormattedMessage id="TermsOfServicePage.p2.5" /></p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2.6.name" /><br />
            <FormattedMessage id="TermsOfServicePage.p2.6.street" /><br />
            <FormattedMessage id="TermsOfServicePage.p2.6.city" /><br />
            <FormattedMessage id="TermsOfServicePage.p2.6.mobile" /><br />
            <FormattedMessage id="TermsOfServicePage.p2.6.email" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2.7" />
          </p>

          <h2><FormattedMessage id="TermsOfServicePage.headline2-2" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-2.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-2.2" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-2.3" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-2.4" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-3" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-3.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-4" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-4.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-5" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-5.1" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p2-5.2" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-6" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-6.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline2-7" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-7.1" />
          </p>
          <ul>
          <li>
            <FormattedMessage id="TermsOfServicePage.p2-7.2" />
          </li>
          <li>
            <FormattedMessage id="TermsOfServicePage.p2-7.3" />
          </li>
          <li>
            <FormattedMessage id="TermsOfServicePage.p2-7.4" />
          </li>
          </ul>
          <p>
            <FormattedMessage id="TermsOfServicePage.p2-7.5" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p2-7.6" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="TermsOfServicePage.headline3" /></h2>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-1" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3.1" />
          </p>

          <p>
            <FormattedMessage id="TermsOfServicePage.p3.2" /><br />

          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3.3" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3.4" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-2" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-2.1" />
          </p>
          <ul>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.2" /></li>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.3" /></li>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.4" /></li>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.5" /></li>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.6" /></li>
            <li><FormattedMessage id="TermsOfServicePage.p3-2.7" /></li>
          </ul>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-2.8" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-2.9" />
          </p>

          <h2><FormattedMessage id="TermsOfServicePage.headline3-3" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-3.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-3.2" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-3.3" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-4" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-4.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-4.2" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-4.3" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-5" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-5.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-6" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-6.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-7" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-7.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-8" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-8.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline3-9" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-9.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-9.2" />
          </p>
          <h3><FormattedMessage id="TermsOfServicePage.headline3-9.1" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p3-9.3" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="TermsOfServicePage.headline4" /></h2>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-1" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4.1" />
          </p>

          <p>
            <FormattedMessage id="TermsOfServicePage.p4.2" /><br />

          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4.3" />
          </p>
         
          <h2><FormattedMessage id="TermsOfServicePage.headline4-2" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-2.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-3" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-3.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-3.2" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-4" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-4.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-5" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-5.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-5.2" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-6" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-6.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-7" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-7.1" />
          </p>
          <h2><FormattedMessage id="TermsOfServicePage.headline4-8" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1" />
          </p>
          <h3><FormattedMessage id="TermsOfServicePage.headline4-8.1" /></h3>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.1" />
          </p>
          <FormattedMessage id="TermsOfServicePage.headline4-8.1.2" />
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.3" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.4" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.5" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.6" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.7" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.8" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.9" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.10" />
            <FormattedMessage id="TermsOfServicePage.p4-8.1.11" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.12" />
          </p>
          <p>
            <FormattedMessage id="TermsOfServicePage.p4-8.1.13" />
          </p>
        </li>
        <li>
          <h2><FormattedMessage id="TermsOfServicePage.headline4" /></h2>
          <h2><FormattedMessage id="TermsOfServicePage.headline5-2" /></h2>
          <p>
            <FormattedMessage id="TermsOfServicePage.p5-2.1" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p5-2.2" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p5-2.3" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p5-2.4" />
          </p><p>
            <FormattedMessage id="TermsOfServicePage.p5-2.5" />
          </p>
        </li>
      </ol>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
