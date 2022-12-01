import { useState } from "react";
import "../addinput.css";
import { BsPencilSquare } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';

const AddInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, onClick, id, ...inputProps } = props;

  //Set appropriate focus on element
  const handleFocus = (e) => {
    setFocused(true);
  };

  //Return input with props passed from parent. Includes IconButton that calls on click prop function.
  return (
    <div className="addinput">
      <label>{label}</label>
      <div class="d-flex justify-content-between">
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            setFocused(true)
          }
          focused={focused.toString()}
        />
        <IconButton className="editAccountIcon" aria-label="edit" size="large" onClick={() => onClick(id)}>
            <BsPencilSquare/>
        </IconButton> 
      </div>
      <span>{errorMessage}</span>
    </div>
  );
};

export default AddInput;