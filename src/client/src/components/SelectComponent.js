import React, { useEffect, useState } from "react";
import outsideClick from "../outsideClick";
import "../select.css";

const SelectComponent = React.forwardRef(
  (
    { options, placeholder = "", onChange, selectedKey, open, setOpen, label},
    ref
  ) => {
    const [inputValue, setInputValue] = useState(placeholder);

    //Upon creation of component, set input value to parameter selectedKey
    useEffect(() => {
      if (selectedKey) {
        setInputValue(options.find((o) => o.key === selectedKey).value);
      }
    }, [selectedKey, options]);

    //Upon creation of component, set input value to parameter selectedKey
    useEffect(() => {
      if (!open && options.findIndex((o) => o.value === inputValue) === -1) {
        if (!inputValue) {
          onChange("");
        } else {
          if (selectedKey) {
            setInputValue(options.find((o) => o.key === selectedKey).value);
          } else {
            setInputValue("");
          }
        }
      }
    }, [open, options, selectedKey, inputValue, onChange]);

    //If select changes, update the state
    const onInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const onInputClick = () => {
      setOpen((prevValue) => !prevValue);
    };

    //Funciton to update dropdown state upon option selection
    const onOptionSelected = (option) => {
      onChange !== undefined && onChange(option.key);
      onChange !== undefined && setInputValue(option.value);
      setOpen(false);
    };

    //Function to clear dropdown state
    const clearDropdown = () => {
      setInputValue("");
      onChange("");
    };

    //Render select component as a stylized input text field with options
    return (
      <div className="dropdown-container" ref={ref}>
        <label>{label}</label>
        <div className="input-container" onClick={onInputClick}>
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <div className="input-arrow-container">
            <i className="input-arrow" />
          </div>

          {selectedKey || inputValue ? (
            <div className="input-clean-container" onClick={clearDropdown}>
              x
            </div>
          ) : null}
        </div>
        <div className={`dropdown ${open ? "visible" : ""}`}>
          {options
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const v = item.value.toLowerCase();

              if (!searchTerm) return true;

              return v.startsWith(searchTerm);
            })
            .map((opt) => (
              <div
                key={opt.key}
                onClick={() => onOptionSelected(opt)}
                className="option"
                value={opt.key}
              >
                {opt.value}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
);

export default outsideClick(SelectComponent);
