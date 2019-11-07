import React from 'react';
import { withFirebase } from '../Firebase';

const buttonStyle = {
    background: "#2b2d71",
    border: 0,
    color: "#fff",
    padding: "15px",
    textTransform: "uppercase",
    position: "relative"
}
// const border = {
//   height: "5px",
//   width: "20px",
//   background: "#fff"
// }

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut} style={buttonStyle}>
    Sign Out
    {/* <div style={border}></div> */}
  </button>
);
export default withFirebase(SignOutButton);