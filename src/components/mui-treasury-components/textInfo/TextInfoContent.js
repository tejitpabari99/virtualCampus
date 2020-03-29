import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './TextInfoContent.styles';

const useDefaultStyles = makeStyles(styles, { name: 'TextInfoContent' });


const TextInfoContent = ({
  useStyles,
  overline,
  heading,
  body,
  overlineProps,
  headingProps,
  bodyProps,
  ...props
}) => {
  const css = useStyles(props);
  return (
    <div>
      {overline && (
        <Typography
          component={'span'}
          {...overlineProps}
          className={classNames(css.overline, overlineProps.className)}
        >
          {overline}
        </Typography>
      )}
      <Typography
        component={'h2'}
        {...headingProps}
        className={classNames(css.heading, headingProps.className)}
      >
        {heading}
      </Typography>
      <Typography {...bodyProps} className={classNames(css.body, bodyProps.className)} >
        {body}
      </Typography>
    </div>
  );
};

TextInfoContent.propTypes = {
  overline: PropTypes.node,
  heading: PropTypes.node,
  body: PropTypes.node,
  overlineProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  headingProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  bodyProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  useStyles: PropTypes.func,
};
TextInfoContent.defaultProps = {
  overline: null,
  heading: null,
  body: null,
  overlineProps: {},
  headingProps: {},
  bodyProps: {},
  useStyles: useDefaultStyles,
};

export default TextInfoContent;
