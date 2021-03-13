import React from 'react'

import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"

import{BrowserRouter as Router, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">UsedHomeFurn</a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
          <Route path="/" component={HomePage} exact/>
          <Route path="/product/:id" component={ProductPage} />
        
      </main>
      <footer className="row center">all rights reserved</footer>
    </div>
    </Router>
  )

   
  
}

export default App;
