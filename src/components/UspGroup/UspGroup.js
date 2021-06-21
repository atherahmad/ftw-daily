/*
 * Renders a set of options with selected and non-selected values.
 *
 * The corresponding component when selecting the values is
 * FieldCheckboxGroup.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';

import css from './UspGroup.css';

const checkSelected = (options, selectedOptions) => {
  return options.map(option => ({
    key: option.key,
    label: option.label,
    isSelected: includes(selectedOptions, option.key),
  }));
};

const Item = props => {
  const { label, isSelected } = props;
  const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
  return (
    <li className={css.item}>
      <div className={css.labelWrapper}>
        <span className={labelClass}>{label}</span>
      </div>
    </li>
  );
};

const UspGroup = props => {
  const { rootClassName, className, id, options, selectedOptions, twoColumns } = props;
  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;

  const checked = checkSelected(options, selectedOptions);

  return (
    <ul className={listClasses}>
      {checked.map(option => (
        <Item key={`${id}.${option.key}`} label={option.label} isSelected={option.isSelected} />
      ))}
    </ul>
  );
};

UspGroup.defaultProps = {
  rootClassName: null,
  className: null,
  selectedOptions: [],
  twoColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

UspGroup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ),
  selectedOptions: arrayOf(string),
  twoColumns: bool,
};

export default UspGroup;
