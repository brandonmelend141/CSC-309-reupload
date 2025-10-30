import React from "react";
import PropTypes from "prop-types";
import "./Tab.css";
export const Tab = (props) => {
  return (
    <li className={props.tabStyle} >
      <button
        className={`${props.tabStyle}-${props.isActive ? "active" : "inactive"}`}
        onClick={(event) => {
          event.preventDefault();
          props.onClick(props.tabIndex);
        }}
      >
        {props.label}
        <div 
        className={props.innerCSS}
        dangerouslySetInnerHTML={{__html: props.innerHtml}}>
        </div>
      </button>
    </li>
  );
};
Tab.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  innerHtml: PropTypes.string,
  innerCSS: PropTypes.string
};