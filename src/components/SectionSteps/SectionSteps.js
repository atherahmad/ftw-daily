import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '..';

import css from './SectionSteps.css';

import value1 from '../../assets/icons/checklist.png';
import value2 from '../../assets/icons/support.png';
import value3 from '../../assets/icons/destinations.png';

import line from '../../assets/icons/line.png';

export class SectionSteps extends Component {
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
          <img src={line} className={css.lineImage}></img>

          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img
                src={value1}
                width="100px"
                style={{ position: 'absolute' }}
                // style={{ marginTop: '50px', position: 'absolute' }}
              ></img>
            </div>
            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionSteps.one" />
            </p>
          </div>

          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img src={value2} width="100px" style={{ position: 'absolute' }}></img>
            </div>
            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionSteps.two" />
            </p>
          </div>
          <div className={css.item}>
            <div className={css.iconWrapper}>
              <img src={value3} width="100px" style={{ position: 'absolute' }}></img>
            </div>
            {/* <h2 className={css.item_Header}>Finanziere</h2> */}
            <p className={css.item_Subtitle}>
              <FormattedMessage id="sectionSteps.three" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SectionSteps.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionSteps.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionSteps;
