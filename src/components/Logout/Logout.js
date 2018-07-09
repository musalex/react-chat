import React from 'react';
import classes from './Logout.css';

const logout = (props) => (
    <div onClick={props.clicked} className={classes.Logout}>
		Log out
	</div>
);

export default logout;
