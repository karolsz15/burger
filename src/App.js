import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// you shoul use functional-component here. It is always better for your app performance
// use class component only as a last resort
class App extends Component {
  render () {
    return (
      // div here is not necessary
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
