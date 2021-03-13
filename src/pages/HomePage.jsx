import React ,{useEffect,useSelector,useDispatch}from 'react'

import Product from "../components/Product"
import {Spinner, Alert} from "react-bootstrap"
import { listProducts } from '../redux/actions/productActions'

export default function HomePage() {
  // const[products,setProducts]=useState([])
  // const[loading,setloading]=useState(false)
  // const[error,setError]=useState(false)
const dispatch=useDispatch()
  const productList = useSelector((state)=>state.productList)
  const {loading,error,products}=productList

  useEffect(()=>{
    dispatch(listProducts)
  },[])
  
    return (
      <div>
      {loading? <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> :error? <Alert className="alert">
    something wrong has happened:{error}
  </Alert>
        :<div className="row center">
          {products.map(product=>
            <Product key={product._id} product={product}/>
             )}
         
        </div>
}
       </div>
    )
    
}
