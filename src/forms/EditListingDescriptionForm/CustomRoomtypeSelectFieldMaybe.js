import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

const CustomRoomtypeSelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;

  console.log(categories);
  const categoryLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.roomtypeLabel',
  });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.roomtypePlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.roomtypeRequired',
    })
  );
  const FS = (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
      //onChange={props.update}
      //value={props.selectedroom}
    >
      <option disabled value="">
        {categoryPlaceholder}
      </option>

      {categories.map(c => (
        <option key={c.key} value={c.key}>
          {intl.formatMessage({ id: c.labelMsgId })}
        </option>
      ))}
    </FieldSelect>
  );
  props.update(FS.props.id);
  return categories ? FS : null;
};

export default CustomRoomtypeSelectFieldMaybe;
