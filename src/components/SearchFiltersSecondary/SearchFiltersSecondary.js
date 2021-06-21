import React, { Component } from 'react';
import { func, object, string, number } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';

import { InlineTextButton } from '../../components';
import css from './SearchFiltersSecondary.css';

class SearchFiltersSecondaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  // Apply the filters by redirecting to SearchPage with new filters.
  applyFilters() {
    const { applyFilters, onClosePanel } = this.props;

    if (applyFilters) {
      applyFilters();
    }

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    const { cancelFilters } = this.props;

    if (cancelFilters) {
      cancelFilters();
    }

    this.props.onClosePanel();
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { resetAll, onClosePanel } = this.props;

    if (resetAll) {
      resetAll(e);
    }

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  render() {
    const { rootClassName, className, children, resultsCount, intl } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const showListingsLabel = intl.formatMessage(
      { id: 'SearchFiltersMobile.showListings' },
      { count: resultsCount }
    );

    return (
      <div className={classes}>
        <div className={css.filtersWrapper}>{children}</div>
        <div className={css.footer}>
          <InlineTextButton rootClassName={css.resetAllButton} onClick={this.resetAll}>
            <FormattedMessage id={'SearchFiltersSecondary.resetAll'} />
          </InlineTextButton>
          <InlineTextButton rootClassName={css.cancelButton} onClick={this.cancelFilters}>
            <FormattedMessage id={'SearchFiltersSecondary.cancel'} />
          </InlineTextButton>
          <InlineTextButton rootClassName={css.applyButton} onClick={this.applyFilters}>
            {/* <FormattedMessage id={'SearchFiltersSecondary.apply'} /> */}
            {showListingsLabel}
          </InlineTextButton>
        </div>
      </div>
    );
  }
}

SearchFiltersSecondaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
};

SearchFiltersSecondaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  applyFilters: func.isRequired,
  resetAll: func.isRequired,
  onClosePanel: func.isRequired,
  resultsCount: number,
  intl: intlShape.isRequired,
};

const SearchFiltersSecondary = injectIntl(withRouter(SearchFiltersSecondaryComponent));

export default SearchFiltersSecondary;
