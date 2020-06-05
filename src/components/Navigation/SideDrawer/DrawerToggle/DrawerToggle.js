import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <i class="fas fa-bars"></i>
    </div>
);

export default drawerToggle;