import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// it isn't a hoc as it is https://en.reactjs.org/docs/higher-order-components.html

// That component could be functional with hooks as vell. Try to change it and use 'useState' hook from react
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        // very good approach!
        // you can use destructing here
        this.setState( ({showSideDrawer}) => {
            return { showSideDrawer: !showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                {/* big up for lifting state (`showSideDrawer`) up! https://en.reactjs.org/docs/lifting-state-up.html */}
                {/* use better naming eg `onDrawerClick` here, and `handleDrawerClick` as a callback implementation */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    // it is good approach to destructing state https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {/* destructing props as well */}
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
