import React from 'react';
import classes from './AlertMessage.css';

const alertMessage = (props) => (
    <div className = {classes.AlertMessage} style={props.position}>
        <span>{props.children}</span>
    </div>
);

export default alertMessage;
