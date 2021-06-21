import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Imprint.css';
import { FormattedMessage } from 'react-intl';

const Imprint = props => {
    const { rootClassName, className } = props;
    const classes = classNames(rootClassName || css.root, className);
    return (
        <div className={classes}>
            <h1 className={css.heading}>
                <FormattedMessage id="Imprint.heading" />
            </h1>
            <div className={css.root}>
                <h2><FormattedMessage id="Imprint.infos" /></h2>
                <p>
                    <FormattedMessage id="Imprint.name" /><br />
                    <FormattedMessage id="Imprint.street" /><br />
                    <FormattedMessage id="Imprint.city" /><br />
                    <FormattedMessage id="Imprint.mobile" /><br />
                    <FormattedMessage id="Imprint.email" />
                </p>
                <h3><FormattedMessage id="Imprint.responsible" /></h3>
                <p>
                    <FormattedMessage id="Imprint.name" /><br />
                    <FormattedMessage id="Imprint.street" /><br />
                    <FormattedMessage id="Imprint.city" /><br />
                </p>

                <h3><FormattedMessage id="Imprint.resolution" /></h3>
                <p>
                    <FormattedMessage id="Imprint.resolutionP1" /><br />
                    <FormattedMessage id="Imprint.resolutionP2" /><br />
                </p>

                <h3><FormattedMessage id="Imprint.contents" /></h3>
                <p>
                    <FormattedMessage id="Imprint.contentsP1" /><br />
                    <FormattedMessage id="Imprint.contentsP2" /><br />
                </p>

                <h3><FormattedMessage id="Imprint.links" /></h3>
                <p>
                    <FormattedMessage id="Imprint.linksP1" /><br />
                    <FormattedMessage id="Imprint.linksP2" /><br />
                </p>

                <h3><FormattedMessage id="Imprint.Copyright" /></h3>
                <p>
                    <FormattedMessage id="Imprint.CopyrightP1" /><br />
                    <FormattedMessage id="Imprint.CopyrightP2" /><br />
                </p>
            </div>
        </div>
    )

};

Imprint.defaultProps = {
    rootClassName: null,
    className: null,
};

const { string } = PropTypes;

Imprint.propTypes = {
    rootClassName: string,
    className: string,
};

export default Imprint;
