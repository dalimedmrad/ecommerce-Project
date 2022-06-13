import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact.js";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState(" ");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            exact
            path="/password/update"
            element={<UpdatePassword />}
          ></Route>
        </Route>

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/dashboard"
            element={<Dashboard />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/products"
            element={<ProductList />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/product"
            element={<NewProduct />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/product/:id"
            element={<UpdateProduct />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/users"
            element={<UsersList />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/user/:id"
            element={<UpdateUser />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/reviews"
            element={<ProductReviews />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/orders"
            element={<OrderList />}
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path="/admin/order/:id"
            element={<ProcessOrder />}
          ></Route>
        </Route>

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            exact
            path="/payment/process"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          ></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/success" element={<OrderSuccess />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/orders" element={<MyOrders />}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/order/:id" element={<OrderDetails />}></Route>
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
