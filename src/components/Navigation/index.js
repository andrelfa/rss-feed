import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Styles from './index.module.css';

const Navigation = ({ authUser }) => (
  <div className={Styles.navbarContainer}>
    <div className={`container`}>
      <div className={Styles.mainNavigation}>
        <AuthUserContext.Consumer>
          {authUser =>
            handleNavigation(authUser)
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  </div>
);

const handleNavigation = (user) => {
  return user ? <NavigationAuth /> : <NavigationNonAuth />
}

const NavigationAuth = () => (
  <ul className={Styles.navbar}>
    <li className={Styles.navbarItem}>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li className={Styles.navbarItem}>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li className={Styles.navbarItem}>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className={Styles.navbar}>
    <li className={Styles.navbarItem}>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li className={Styles.navbarItem}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;