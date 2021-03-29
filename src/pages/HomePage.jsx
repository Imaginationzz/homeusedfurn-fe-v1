import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../components/Slider";

import Product from "../components/Product";
import { Spinner, Alert } from "react-bootstrap";
import { listProducts } from "../redux/actions/productActions";

export default function HomePage() {
  // const[products,setProducts]=useState([])
  // const[loading,setloading]=useState(false)
  // const[error,setError]=useState(false)

  const productState = useSelector((state) => state.productState);
  const { loading, error, products } = productState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Slider />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert className="alert">something wrong has happened:{error}</Alert>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
