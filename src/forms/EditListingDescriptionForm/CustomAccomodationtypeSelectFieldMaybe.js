import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

const CustomAccomodationtypeSelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;
  const categoryLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.accomodationtypeLabel',
  });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.accomodationtypePlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.accomodationtypeRequired',
    })
  );
  return categories ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option disabled value="">
        {categoryPlaceholder}
      </option>
      {categories.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomAccomodationtypeSelectFieldMaybe;
