import React, { useState } from 'react';
import css from './LandingLocationSelect.css';
import { useIntl } from 'react-intl';

export const LandingLocationSelect = (props, context) => {
  const [continentList, setContinentList] = useState([
    'worldwide',
    'africa',
    'asia',
    'southamerica',
    'europe',
  ]);

  const intl = useIntl();
  return (
    <form onChange={props.handleChange}>
      <select
        style={{
          paddingRight: '40px',
          fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
          fontWeight: 'var(--fontWeightSemiBold)',
          fontSize: '16px',
          lineHeight: '14px',
          paddingLeft: '10px',
        }}
        className={css.continentselect}
        onChange={props.onChange}
        value={props.value}
      >
        {continentList.map((n, id) => {
          //console.log('this id is: ' + id);
          return <option value={n}>{intl.formatMessage({ id: n })}</option>;
        })}
      </select>
    </form>
  );
};
export default LandingLocationSelect;
