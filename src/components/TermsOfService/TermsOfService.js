import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';
import { FormattedMessage } from 'react-intl';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      {/* <p className={css.lastUpdated}>Last updated: October 30, 2017</p> */}
      <p>
        <FormattedMessage id="Terms.p1" />
      </p>
      <h2><FormattedMessage id="Terms.head0" /></h2>
      <p>
        <FormattedMessage id="Terms.p0-1" /><br/><br/>
        <FormattedMessage id="Terms.p0-2" />
      </p>
      <ol>
        <li>
          <h2><FormattedMessage id="Terms.head1" /></h2>
          <p>
            <ul>
            {
              Array.from({ length: 7 }, (_, index) => index + 1).map((term, index) => {
                return (<li key={index}>
                  <FormattedMessage  id={"Terms.p1-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head2" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 3 }, (_, index) => index + 1).map((term, index) => {
                return (<li>
                  <FormattedMessage key={index} id={"Terms.p2-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head3" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 7 }, (_, index) => index + 1).map((term, index) => {
                if(term===4){
                  return (<li key={index}>
                    <FormattedMessage  id={"Terms.p3-" + term} /><br /><br />
                    <FormattedMessage  id={"Terms.p3-" + term+".1"} /><br /><br />
                    <FormattedMessage  id={"Terms.p3-" + term+".2"} /><br /><br />
                  </li>
                  )
                }
                return (<li key={index}>
                  <FormattedMessage  id={"Terms.p3-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head4" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 3 }, (_, index) => index + 1).map((term, index) => {
                return (<li key={index} >
                  <FormattedMessage key={index} id={"Terms.p4-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head5" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 2 }, (_, index) => index + 1).map((term, index) => {
                return (
                <li key={index}>
                  <FormattedMessage  id={"Terms.p5-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head6" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 2 }, (_, index) => index + 1).map((term, index) => {
                return (<li  key={index}>
                  <FormattedMessage  id={"Terms.p6-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head7" /></h2>
          <p>
            <FormattedMessage id="Terms.p7-1" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head8" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 6 }, (_, index) => index + 1).map((term, index) => {
                return (<li  key={index}>
                  <FormattedMessage  id={"Terms.p8-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head9" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 4 }, (_, index) => index + 1).map((term, index) => {
                return (<li key={index}>
                  <FormattedMessage key={index} id={"Terms.p9-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head10" /></h2>
          <p>
            <FormattedMessage id="Terms.p10" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head11" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 3 }, (_, index) => index + 1).map((term, index) => {
                return (<li key={index}>
                  <FormattedMessage key={index} id={"Terms.p11-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head12" /></h2>
          <p>
            <FormattedMessage id="Terms.p12" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head14" /></h2>
          <p>
            <FormattedMessage id="Terms.p13" />
          </p>
        </li>

        <li>
          <h2><FormattedMessage id="Terms.head13" /></h2>
          <p>
            <ul>
          {
              Array.from({ length: 2 }, (_, index) => index + 1).map((term, index) => {
                return (<li key={index}>
                  <FormattedMessage key={index} id={"Terms.p14-" + term} /><br /><br />
                </li>
                )
              })
            }
            </ul>
          </p>
        </li>
      </ol>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
