import React, { useState, useEffect } from 'react';
import './App.css';
import Service from './services/rss-feeds';
import RssItemCard from './components/RssItemCard';
import { sortByDateWithMoment } from './utils/utils';

const App = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        Service.getBBCFeed().then(res => setFeed((old) => sortByDateWithMoment([...old,...res], 'publishDate')));
        Service.getKotakuFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getB9Feed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getVoxFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getNYTimesFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getG1Feed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getWiredFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
        Service.getPolygonFeed().then(res => setFeed((old) => sortByDateWithMoment([...old, ...res], 'publishDate')));
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
    const newFeed = [...feed].map((item) => {
      if (item.feedName === name) item.active = !item.active;
      return item;
    })
    setFeed([...newFeed]);
  }

  return (
    <div className="App container">
      <div className="title-container">
        <label>
          Feed dos Amigo
        </label>
      </div>

      <div className="filter-container">
        <label className="filter-title">
          Filtros:
        </label>

        <div className="filter-buttons-container">
          <div className={`filter-button ${feed.filter(item => item.feedName === 'Kotaku' && item.active === true).length > 0 ? 'checked' : ''}`} onClick={() => handleChangeFilter('Kotaku')}>
            Kotaku
          </div>
        </div>
      </div>

      <div className="loading-container">
        <label>Calma que tá carregando...</label>
        <img src={'./img/spinner.svg'} alt="Carregando..." />
      </div>
      
      <div className="items-container">
        {feed.length && feedItems()}
      </div>
    </div>
  );
}

export default App;
