import PropTypes from "prop-types";
import React from "react";
import Box from "../box";

const BlocksComponent = props => {
  const { componentRef, ...componentProps } = props;
  return <Box componentRef={componentRef} {...componentProps} />;
};
BlocksComponent.propTypes = {
  componentRef: PropTypes.func
};
export default BlocksComponent;
