import React, { useState, useEffect } from 'react';
import './App.css';
import Service from './services/rss-feeds';
import RssItemCard from './components/RssItemCard';
import { sortByDateWithMoment } from './utils/utils';

const App = () => {
  // const [bbcFeed, setBBCFeed] = useState([]);
  // const [kotakuFeed, setKotakuFeed] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        // await Promise.all([Service.getBBCFeed(), Service.getKotakuFeed(), Service.getB9Feed()])
        Service.getBBCFeed().then(res => setFeed((old) => sortByDateWithMoment([...old,...res], 'publishDate')));
        Service.getKotakuFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getB9Feed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
      }

      fetchData();
  }, []);



  const feedItems = () => {
    return feed.map((item) => {
      return item.active ? (<RssItemCard 
        key={item.link} 
        title={item.title} 
        description={item.description} 
        link={item.link}
        publishDate={item.publishDate}
      />) : null
    })
  }

  const handleChangeFilter = (name) => {
    // const hasItemsWithName = !!feed.filter(item => item.feedName === name).length;
    // const newFeed = [...feed].filter(item => hasItemsWithName ? item.feedName !== name : item.feedName === name);
    // setFeed([...newFeed]);
    // console.log('new feed', newFeed)

    const newFeed = [...feed].map((item) => {
      if (item.feedName === name) item.active = !item.active;
      return item;
    })
    setFeed([...newFeed]);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12 div col-sm-12">
            <div className="filter-container">
              <p className="filter-title">
                Filtros:
              </p>
              <div className="filter-buttons">
                <button className={`filter-btn ${feed.filter(item => item.feedName === 'Kotaku' && item.active === true).length > 0 ? 'checked' : ''}`} onClick={() => handleChangeFilter('Kotaku')}>
                  Kotaku
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            {feed.length && feedItems()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
