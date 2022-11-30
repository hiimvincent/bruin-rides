import React from "react";

const CapacityBar = (props) => {
  const { completed } = props;

  //Set Color for Capacity Bar
  let bgcolor;
  if (completed < 25) {
    bgcolor = '#ba0d0d';
  } else if (completed >= 25 && completed < 50 ) {
    bgcolor = '#de6a1d';
  } else if (completed >= 50 && completed < 75 ) {
    bgcolor = '#e0ba0d';
  } else {
    bgcolor = '#33b30c'
  }
  
  //Style for container around bar
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 0,
  }

  //Style for filler in bar
  const fillerStyles = {
    height: '100%',
    width: `${completed > 100 ? 100 : completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  //Style for bar label
  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  //Render the container and capacity bar
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default CapacityBar;