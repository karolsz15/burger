import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    // height is undefined here
    <div className={classes.Logo} style={{height: props.height}}>
        {/**
         * we use alt for accessibility so you can type "Picture of tasty burger" here.
         * PascalCase means nothing for people and eg. text readers
         */}
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;