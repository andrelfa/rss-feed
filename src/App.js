import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from './constants/routes';

const getWallpapers = () => {
  const url = "https://wallhaven.cc/api/v1/search?resolutions=1920x1080"; // site that doesn’t send Access-Control-*
  return fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
  .catch((error) => console.log("Error fetching wallpapers", error))
}  

useEffect(() => {
  Promise.all([
    getWallpapers(),
  ]).then((res) => {
    console.log('wallpapers result', res);
  })
}, []);


const App = () => (
  <Router>
    <Navigation />
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.HOME} component={HomePage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    <Route path={ROUTES.ADMIN} component={AdminPage} />
  </Router>
);
export default App;
