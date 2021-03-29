
import React from 'react'

import { useSelector, useDispatch } from "react-redux"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import { Badge, Dropdown } from "react-bootstrap"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import SigninPage from './pages/SigninPage'
import { signout } from './redux/actions/userActions'
import RegisterPage from './pages/RegisterPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceorderPage from './pages/PlaceorderPage'
import AddProductPage from './pages/AddProductPage'

function App() {
  const [showSide, setShowSide] = React.useState(false)
  const [items, setItems] = React.useState([])
  const cartState = useSelector(state => state.cartState)

  const totalItems = items.reduce((prev, curr) => prev + curr.Quantity, 0)

  const userInfo = useSelector(state => state.userState.userInfo)

  const dispatch = useDispatch()

  React.useEffect(() => {
    setItems(cartState.cartItems)
  }, [cartState, setItems])

  const signoutHandler = () => {
    dispatch(signout())
  }
  const openMenu=()=>{
    setShowSide(true)
  }
  const closeMenu=()=>{
    setShowSide(false)
  }
  return (
    <Router>
      <div className="grid-container">
        <header className="row">

          <div className="sidebarButton">
            <button  onClick={()=>openMenu()}> &#9776;</button>
            <Link className="brand" to="/">UsedHomeFurn</Link>
          </div>
          <div>
            <Link className="link-nav" to="/cart">
              Cart
            {items.length > 0 && (
                <span className="Badge"><Badge variant="secondary">{totalItems}</Badge></span>
              )}
            </Link>
            {
              userInfo ? (
                <Dropdown className="dropdwon">
                  <Link to="#">{userInfo.userName}
                    <i className="fa fa-caret-down"></i></Link>
                  <Dropdown.Item className="dropdwon-item" onClick={signoutHandler} href="/signin">Sign Out</Dropdown.Item>
                </Dropdown>
              ) :
                (<Link className="link-nav" to="/signin">Sign In</Link>)
            }
             <Link className="link-nav" to="/addproduct">
              Add Product
            
            </Link>

          </div>

        </header>
          <aside className={showSide ?"sidebar open":"sidebar"}>
            <h3>Product Categories</h3>
            <button className="sideBarCloseBtn" onClick={()=>closeMenu()}>-</button>
            <ul>
             
            <li><Link className="link" to="#">Beds</Link></li>
            <li><Link className="link" to="#">Tables</Link></li>
            <li><Link className="link" to="#">Chairs</Link></li>
            <li><Link className="link" to="#">Sofas</Link></li>
            
              
            </ul>

          </aside>
        <main>

          <Route path="/signin" component={SigninPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/shipping" component={ShippingPage} exact />
          <Route path="/payment" component={PaymentPage} exact />
          <Route path="/placeorder" component={PlaceorderPage} exact />
          <Route path="/addproduct" component={AddProductPage} exact />
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />

        </main>
        <footer className="row center">UsedHomeFurn-all rights reserved</footer>
      </div>
    </Router>
  )



}

export default App;
