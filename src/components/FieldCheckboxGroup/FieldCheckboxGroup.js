/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'react-final-form-arrays';
import { FieldCheckbox, ValidationError, FieldTextInput } from '../../components';

import css from './FieldCheckboxGroup.css';

const FieldCheckboxRenderer = props => {
  const {
    className,
    rootClassName,
    label,
    twoColumns,
    id,
    fields,
    options,
    meta,
    getValue,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;

  // const ischeked = name => {
  //   const checking = fields.value.filter(it => {
  //     return it === 'other';
  //   });
  //   if (name === 'other' && checking.length !== 0) return false;
  //   else return true;
  // };

  // fields.value.map(value => {
  //   console.log(
  //     options.filter(item => {
  //       return value === item.key;
  //     })
  //   );
  //   if (
  //     options.filter(item => {
  //       return value === item.key;
  //     }).length === 0
  //   ) {
  //     options.splice(options.length - 1, 0, { key: value, label: value });
  //   }
  // });

  return (
    <fieldset className={classes}>
      {label ? <legend>{label}</legend> : null}
      <ul className={listClasses}>
        {options.map((option, index) => {
          const fieldId = `${id}.${option.key}`;
          return (
            <li key={fieldId} className={css.item}>
              <FieldCheckbox
                id={fieldId}
                name={fields.name}
                label={option.label}
                value={option.key}
              />
              {/* <FieldTextInput
                name={option.key}
                type="textarea"
                getValue={getValue.bind(this)}
                hidden={ischeked(option.key)}
              /> */}
            </li>
          );
        })}
      </ul>
      <ValidationError fieldMeta={{ ...meta }} />
    </fieldset>
  );
};

FieldCheckboxRenderer.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  twoColumns: false,
};

FieldCheckboxRenderer.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
};

const FieldCheckboxGroup = props => <FieldArray component={FieldCheckboxRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldCheckboxGroup.propTypes = {
  name: string.isRequired,
};

export default FieldCheckboxGroup;
