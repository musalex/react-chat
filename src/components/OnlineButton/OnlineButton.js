import React from 'react';
import classes from './OnlineButton.css';

const onlineButton = (props) => {
    let click = (e) => {
        props.clicked();
    }
    return (
        <div 
            onMouseDown={(e)=>{e.preventDefault()}} 
            onClick={click} 
            className={classes.OnlineButton}
        > 
            Online
        </div>
    )
};

export default onlineButton;
