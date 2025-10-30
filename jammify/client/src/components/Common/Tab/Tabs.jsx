import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Tabs.css";

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.defaultIndex,
    };
  }

  navigateTabs = (tabIndex)=> {
    this.setState({
      activeIndex: tabIndex,
    });
  }

  renderTabs() {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        onClick: this.navigateTabs,
        tabIndex: index,
        isActive: index === this.state.activeIndex,
      });
    });
  }

  displayTabContent() {
    const { children } = this.props;
    const { activeIndex } = this.state;
    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }
  }

  render() {
    return (
      <div className="tabs">
        <ul className={this.props.tabClassName}>
          {this.renderTabs()}
        </ul>
        <div className= {`${this.props.tabClassName}-Content`}>
          {this.displayTabContent()}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  defaultIndex: PropTypes.number,
};

Tabs.defaultProps = {
  defaultIndex: 0,
};
