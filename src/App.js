// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Service from './services/rss-feeds';
// import RssItemCard from './components/RssItemCard';
// import { sortByDateWithMoment } from './utils/utils';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase';

// const config = {
//   apiKey: 'AIzaSyDvGrVOV7nhrSaGp3UPdIfWRGTRi5NQ-K8',
//   authDomain: 'rss-feed-a6f20.firebaseapp.com',
//   projectId: 'rss-feed-a6f20'
// };
// firebase.initializeApp(config);

// const uiConfig = {
//   signInFlow: 'popup',
//   signInSuccessUrl: '/signedIn',
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ]
// };

// const App = () => {
//   const [feed, setFeed] = useState([]);

//   useEffect(() => {
//       const fetchData = async () => {
//         Service.getBBCFeed().then(res => setFeed((old) => sortByDateWithMoment([...old,...res], 'publishDate')));
//         Service.getKotakuFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getB9Feed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getVoxFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getNYTimesFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getG1Feed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getWiredFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//         Service.getPolygonFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
//       }

//       fetchData();
//   }, []);



//   const feedItems = () => {
//     return feed.map((item) => {
//       return item.active ? (<RssItemCard 
//         key={item.link} 
//         title={item.title} 
//         description={item.description} 
//         link={item.link}
//         publishDate={item.publishDate}
//       />) : null
//     })
//   }

//   const handleChangeFilter = (name) => {
//     const newFeed = [...feed].map((item) => {
//       if (item.feedName === name) item.active = !item.active;
//       return item;
//     })
//     setFeed([...newFeed]);
//   }

//   return (
//     <div className="App">
//       <div>
//         <h1>My App</h1>
//         <p>Please sign-in:</p>
//         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
//       </div>      
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12 div col-sm-12">
//             <div className="filter-container">
//               <p className="filter-title">
//                 Filtros:
//               </p>
//               <div className="filter-buttons">
//               <button className={`filter-btn ${feed.filter(item => item.feedName === 'Kotaku' && item.active === true).length > 0 ? 'checked' : ''}`} onClick={() => handleChangeFilter('Kotaku')}>
//                   Kotaku
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="items-container">
//           {feed.length && feedItems()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
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
const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);
export default App;
