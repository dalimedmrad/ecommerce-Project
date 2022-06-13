import React, { Fragment, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="E-COMMERCE" />

          <div className="banner">
            <p>E-COMMERCE</p>
            <h1>FOR ALL KINDS OF WEAR ! </h1>

            <a href="#container">
              <button>
                Shop Now <AiOutlineShoppingCart />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Our latest arrivals</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
