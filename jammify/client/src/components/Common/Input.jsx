import React from "react";
class Input extends React.Component {
  render() {
    const { label, value, onChange, name } = this.props;
    return (
        <input
          name={name}
          label={label}
          defaultValue={value || ""}
          margin="normal"
          onChange={onChange}
        />
    );
  }
}

export default Input;
