import { useState } from "react";
import "../addinput.css";

const AddInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  //Set appropriate focus on element
  const handleFocus = (e) => {
    setFocused(true);
  };

  //Return input with props passed from parent. Includes IconButton that calls on click prop function.
  return (
    <div className="addinput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default AddInput;