import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '..';

import css from './SectionValues.css';

import value1 from '../../assets/icons/values_promises/social.png';
import value2 from '../../assets/icons/values_promises/sustainable_about.png';
import value3 from '../../assets/icons/values_promises/passion_about.png';

import line from '../../assets/icons/line.png';

export class SectionValues extends Component {
  constructor(props) {
    super(props);
    const {} = props;
    this.state = {
      firstToggle: 'first',
    };
  }

  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.items}>
          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img
                src={value1}
                width="100px"
                style={{ position: 'absolute' }}
                // style={{ marginTop: '50px', position: 'absolute' }}
              ></img>
            </div>
            <h2 className={css.item_Header}>
              <FormattedMessage id="sectionValues.title.one" />
            </h2>

            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionValues.one" />
            </p>
          </div>

          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img src={value2} width="140px" style={{ position: 'absolute' }}></img>
            </div>
            <h2 className={css.item_Header}>
              <FormattedMessage id="sectionValues.title.two" />
            </h2>

            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionValues.two" />
            </p>
          </div>
          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img src={value3} width="100px" style={{ position: 'absolute' }}></img>
            </div>
            <h2 className={css.item_Header}>
              <FormattedMessage id="sectionValues.title.three" />
            </h2>

            {/* <h2 className={css.item_Header}>Finanziere</h2> */}
            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionValues.three" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SectionValues.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionValues.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionValues;
