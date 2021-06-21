import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

import getCategoryCodes from '../../translations/categoryCodes';
import config from '../../config';

const categoryCodes = getCategoryCodes(config.locale);

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;
  const categoryLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.categoryLabel',
  });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.categoryPlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.categoryRequired',
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

      {categoryCodes.map(category => {
        return (
          <option key={category.code} value={category.code}>
            {category.name}
          </option>
        );
      })}
    </FieldSelect>
  ) : null;
};

export default CustomCategorySelectFieldMaybe;
