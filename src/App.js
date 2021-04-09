
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
import ChatModal from './components/ChatModal'
import io from "socket.io-client";
const connOpt = {
  transports: ["websocket", "polling"],
};

let socket = io("http://localhost:5000/", connOpt);


function App() {
  const [showSide, setShowSide] = React.useState(false)
  
  const [items, setItems] = React.useState([])
  const cartState = useSelector(state => state.cartState)

  const totalItems = items.reduce((prev, curr) => prev + curr.Quantity, 0)

  const userInfo = useSelector(state => state.userState.userInfo)
//chat state
  const [showModal, setShowModal] =React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [connectedUsers, setConnectedUsers] = React.useState([]);

  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = React.useState("");
 
 const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const toggleModal=()=>{
    setShowModal(!showModal);
    socket.emit("joinRoom",{room:"generalChat",username:userInfo.userName})
  }
  const sendMessage =e=>{
    e.preventDefault();
    socket.emit("sendMessage",{room:"generalChat",message})
    setMessage("")
  }
const handleMessage =e=>{
  setMessage(e.target.value)
}
React.useEffect(() => {
  socket.on("message",msg=>setMessages(messages=>messages.concat(msg)))
  socket.on("roomData",({room,users})=>setConnectedUsers(users))
  socket.on("connect_error")
}, [])


  React.useEffect(() => {
    setItems(cartState.cartItems)
  }, [cartState, setItems])

  const signoutHandler = () => {
    dispatch(signout(dispatch))
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
          <div className="search"> 
          <input value={searchTerm}
               onChange={handleSearch} type="text" placeholder="Search.."></input>
          </div>
          <div className="left-menu">
          
            
            <div>
            <ChatModal showModal={showModal} 
            toggleModal={toggleModal}
            connectedUsers={connectedUsers}
            messages={messages}
            sendMessage={sendMessage}
            message={message}
            handleMessage={handleMessage}
            />
            </div>
            <Link className="link-nav" onClick={toggleModal}>Chat</Link>
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
          <aside onClick={()=>closeMenu()} className={showSide ?"sidebar open":"sidebar"}>
            <h3 onClick={()=>closeMenu()}>Product Categories</h3>
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
          <Route
          path="/"
          exact
          render={() => <HomePage searchTerm={searchTerm} />}
        />
         
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />

        </main>
        <footer className="row center">UsedHomeFurn-all rights reserved</footer>
      </div>
    </Router>
  )



}

export default App;
