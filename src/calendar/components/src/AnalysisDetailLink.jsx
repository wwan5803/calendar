import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { generateAnalysisUrl } from "utils";
import PropTypes from "prop-types";

export const AnalysisDetailLinkWithSearch = connect((state, {location}) => {
  const { search, pathname } = location;
  return { search, pathname };
})(function AnalysisDetailLinkWithSearch({
  search,
  pathname,
  children,
  analysisId,
  className
}) {
  return (
    <Link
      to={generateAnalysisUrl({ pathname, search, analysisId })}
      className={className}
    >
      {children}
    </Link>
  );
});

export const AnalysisDetailLinkWithoutSearch = connect((state, {location}) => ({
  pathname: location.pathname
}))(function AnalysisDetailLinkWithSearch({
  pathname,
  children,
  analysisId,
  className
}) {
  return (
    <Link
      to={generateAnalysisUrl({ pathname, analysisId })}
      className={className}
    >
      {children}
    </Link>
  );
});

AnalysisDetailLinkWithSearch.propTypes = {
  analysisId: PropTypes.number.isRequired
};

AnalysisDetailLinkWithoutSearch.propTypes = {
  analysisId: PropTypes.number.isRequired
};
