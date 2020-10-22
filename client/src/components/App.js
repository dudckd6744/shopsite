import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductpage/UploadProductPage';
import DetailPage from './views/DetailPage/DetailPage';
import CartPage from './views/CartPage/CartPage';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ backgroundImage:"url(https://mblogthumb-phinf.pstatic.net/MjAyMDA5MjBfNTIg/MDAxNjAwNjA2Nzg1OTgw.qW4QG_OxJr0OtY7bKfpB7cNzx9misVRrijn8IlhGW_Mg.kvwBAbDb11sFZiRttDmsqgHzoG3Ec4mxwHd42MXl9ZMg.JPEG.dudckd6744/IMG_4981.jpeg?type=w800)",
      backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"cover", paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:pageId" component={Auth(DetailPage, true)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
