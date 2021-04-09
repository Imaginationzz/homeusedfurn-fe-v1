import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider2";

import Product from "../components/Product";
import { Spinner, Alert } from "react-bootstrap";
import { listProducts } from "../redux/actions/productActions";

export default function HomePage({ searchTerm }) {
  const productState = useSelector((state) => state.productState);
  const { loading, error, products } = productState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filteredProds = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      )
    : [];
  return (
    <div>
      <Slider2 />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="s r-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert className="alert">something wrong has happened:{error}</Alert>
      ) : (
        // ) : searchTerm?(products.filter(product =>
        //   product.name.toLowerCase().includes(searchTerm));
        //
        <div className="row center">
          {filteredProds.length > 0
            ? filteredProds.map((product) => (
                <Product key={product._id} product={product} />
              ))
            : products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </div>
      )}
    </div>
  );
}
