import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.css';

import cooperation from './images/cooperation.png';

import criteria1 from '../../assets/icons/values_promises/great_effect.png';
import criteria2 from '../../assets/icons/values_promises/chosen_carefully.png';
import criteria3 from '../../assets/icons/values_promises/travel_authentic.png';

import value1 from '../../assets/icons/values_promises/sustainable.png';
import value2 from '../../assets/icons/values_promises/passion.png';
import value3 from '../../assets/icons/values_promises/social.png';

import CriteriaDrawer from './CriteriaDrawer';

import PartnerDrawer from './PartnerDrawer';
import Background from '../../assets/sectionHow.png';
import cloud1 from '../../assets/clouds/cloud1.png';

export class SectionHowItWorks extends Component {
  constructor(props) {
    super(props);
    const {} = props;
    this.state = {
      firstToggle: 'first',
    };
  }

  componentDidMount() {
    if (window.location.pathname === '/about') {
      this.setState({ firstToggle: 'second' });
    } else {
      this.setState({ firstToggle: 'first' });
    }
  }
  render() {
    const firstClick = () => {
      this.setState({ firstToggle: 'first' });
    };
    const secondClick = () => {
      this.setState({ firstToggle: 'second' });
    };

    return (
      <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
        <div className={css.cloudsOuter} style={{ position: 'absolute', zIndex: 1 }}>
          <img
            // className={css.heroImage}
            className={css.clouds}
            src={cloud1}
            width="150%"
          ></img>
        </div>
        <img src={Background} style={{ position: 'absolute' }} width="100%"></img>

        <div className={css.wrapper}>
          {/* <div className={css.tabs}>
        <div className={css.tab}>Versprechen</div>
        <div className={css.tab}>Werte</div>
      </div> */}

          <div className={css.lowerMenu}>
            <span
              id="menuText"
              className={this.state.firstToggle === 'first' ? css.active : css.lowerMenuText}
              onClick={firstClick}
            >
              <span className={css.lowerMenuText}>Versprechen</span>
            </span>

            <span
              id="menuText"
              className={this.state.firstToggle === 'second' ? css.active : css.lowerMenuText}
              onClick={secondClick}
            >
              <span className={css.lowerMenuText}>Werte</span>
            </span>
          </div>

          {/* VERSPRECHEN */}

          <div className={this.state.firstToggle === 'first' ? css.items : css.items_hide}>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={criteria3} width="26%" style={{}}></img>
              </div>

              <h2 className={css.item_Header}>Authentisch reisen</h2>
              <p className={css.item_Subtitle}>
                In einem Socialbnb tritts du auf einzigartige Weise mit Land und Leuten in Kontakt
                und lernst mehr über lokale Lösungsansätze für globale Herausforderungen.
              </p>
              <div>
                <button
                  className={css.itemButton}
                  onClick={function() {
                    window.open('/s', '_self');
                  }}
                >
                  Unsere Reiseziele
                </button>
              </div>
            </div>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={criteria1} width="30%" style={{}}></img>
              </div>
              <h2 className={css.item_Header}>Große Wirkung</h2>
              <p className={css.item_Subtitle}>
                Jede Übernachtung finanziert das soziale oder ökologische Projekt bei dem du
                schläfst. So bekommen die Organisationen die Möglichkeit, ihre wertvolle Arbeit
                nachhaltig zu finanzieren.
              </p>
              <div>
                <PartnerDrawer></PartnerDrawer>
              </div>
            </div>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={criteria2} width="30%" style={{}}></img>
              </div>
              <h2 className={css.item_Header}>Sorgfältig ausgewählt</h2>
              <p className={css.item_Subtitle}>
                Wir arbeiten mit kleinen, lokalen Projekten, da diese oft am besten wissen was die
                Menschen vor Ort brauchen. Diese durchlaufen einen Auswahlprozess, um die
                bestmögliche Transparenz herzustellen.
              </p>
              <CriteriaDrawer></CriteriaDrawer>
            </div>
          </div>

          {/* Values */}

          <div className={this.state.firstToggle === 'second' ? css.items : css.items_hide}>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={value3} width="26%" style={{}}></img>
              </div>

              <h2 className={css.item_Header}>Sozial</h2>
              <p className={css.item_Subtitle}>
                Wir verstehen uns als social Business. Das bedeutet, dass wir unseren
                gesellschaftlichen Mehrwert an erster Stelle sehen.
              </p>
              <div>{/* <button className={css.criteriaButton}>Unsere Reiseziele</button> */}</div>
            </div>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={value1} width="30%" style={{}}></img>
              </div>
              <h2 className={css.item_Header}>Nachhaltig</h2>
              <p className={css.item_Subtitle}>
                Wir sind der Überzeugung, dass es Alternativen braucht, um Nachhaltigkeit in unseren
                Alltag zu integrieren. Deshalb machen wir nachhaltiges Reisen so einfach wie
                möglich.
              </p>
              <div>{/* <button className={css.criteriaButton}>Unsere Partner</button> */}</div>
            </div>
            <div className={css.item}>
              <div className={css.iconWrapper}>
                <img src={value2} width="25%" style={{}}></img>
              </div>
              <h2 className={css.item_Header}>Leidenschaftlich</h2>
              <p className={css.item_Subtitle}>
                Wir sind selbst leidenschaftliche Reisende und möchten Dir das Kennenlernen neuer
                Orte, Länder und Menschen auf nachhaltige Weise ermöglichen.
              </p>
              {/* <CriteriaDrawer></CriteriaDrawer> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
