import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = ( props ) => {
    /**
     * cool but you need simple helper for that conditional-css-classes usage
     * 
     * here is implementation
     * 
     * // @NOTE `classes` must be array
     * const classNamesHelper = (classes) => classes.filter((el) => el);
     * 
     * and ussage:
     * 
     * <div className={classNamesHelper([classes.SideDrawer, props.open ? classes.Open : classes.Close])}>
     * 
     * and move that helper to /src/utils scope, you probably will use it later somewhere else
     */
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        // use React.Fragment here
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;