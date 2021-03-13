import {createStore,compose,applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {productReducer} from "./reducers/productReducer"


const mainReducer =combineReducers({ 
    productList:productReducer
})

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const storeConfig= createStore(mainReducer, composedEnhancer(applyMiddleware(thunk)))

export default storeConfig