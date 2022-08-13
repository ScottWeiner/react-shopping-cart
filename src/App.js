//feature 1 - example
import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

import store from './store/store'
import { Provider } from 'react-redux'
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

class App extends Component {


  render() {
    return (

      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">React Shopping Cart</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Routes>
                <Route path='/admin' element={<AdminScreen />} />
                <Route path='/' exact element={<HomeScreen />} />
              </Routes>
            </main>
            <footer>Some rights reserved, but not all.</footer>
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
