import React from 'react';
import classes from './OnlineBody.css';

const onlineBody = (props) => {
    return (
        <div className={classes.OnlineBody} style={{opacity:props.opacity} }>
            <div className={classes.ListWrap}>
                <ul className={classes.OnlineUsers}>
                    {props.users.map((e,i)=> <li key = {i}>{e}</li>)}
                </ul>
            </div>
        </div>
    )
};

export default onlineBody;
