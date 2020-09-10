import React from 'react';

import classes from './NavigationItem.module.css';

// Try to implement React-router https://reactrouter.com/web/example/basic
const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <a 
            href={props.link} 
            className={props.active ? classes.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;