import React from 'react';

const centerdStyle = {
  fontFamily: 'Caecilia LT Std, serif',
	fontWeight: 'normal',
	letterSpacing: '3px',
	fontSize: '20px',
  color: '#000',
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};
const ComingSoon = (props) => {
  return (
    <div style={centerdStyle}>
      <h1>
        {props.page} Coming Soon.
      </h1>
    </div>
  );
}

export default ComingSoon;