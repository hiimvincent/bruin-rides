import React from "react";

const CapacityBar = (props) => {
  const { completed } = props;
  let bgcolor;
  if (completed < 25){
    bgcolor = '#ba0d0d';
  } else if (completed >= 25 && completed < 50 ){
    bgcolor = '#de6a1d';
  } else if (completed >= 50 && completed < 75 ){
    bgcolor = '#e0ba0d';
  } else{
    bgcolor = '#33b30c'
  }
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 0,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default CapacityBar;